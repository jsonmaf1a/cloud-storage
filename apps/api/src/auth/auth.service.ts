import { ExposeGroup } from "@/common/enums/expose-group";
import { GeneralConfig } from "@/config/general.config";
import { MailService } from "@/mail/mail.service";
import { Session } from "@/session/domain/session";
import { SessionService } from "@/session/session.service";
import { SocialData } from "@/social/social.interface";
import { Status } from "@/statuses/statuses";
import { User } from "@/users/domain/user";
import { UsersService } from "@/users/users.service";
import { AuthLoginResponseDto, Nullable, UserSchema } from "@cloud/shared";
import {
    HttpStatus,
    Injectable,
    NotFoundException,
    Res,
    UnauthorizedException,
    UnprocessableEntityException,
} from "@nestjs/common";
import { randomStringGenerator } from "@nestjs/common/utils/random-string-generator.util";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { instanceToPlain } from "class-transformer";
import ms from "ms";
import * as crypto from "node:crypto";
import { AuthProviders } from "./auth-providers";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthUpdateDto } from "./dto/auth-update.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { JwtPayload } from "./types/jwt-payload";
import { JwtRefreshPayload } from "./types/jwt-refresh-payload";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
        private sessionService: SessionService,
        private mailService: MailService,
        private configService: ConfigService<GeneralConfig>,
    ) {}

    async validateLogin(loginDto: AuthLoginDto): Promise<AuthLoginResponseDto> {
        const user = await this.usersService.findByEmail(loginDto.email);

        if (!user) {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    email: "notFound",
                },
            });
        }

        if (user.provider !== AuthProviders.Email) {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    email: `needLoginViaProvider:${user.provider}`,
                },
            });
        }

        if (!user.password) {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    password: "incorrectPassword",
                },
            });
        }

        const isValidPassword = await bcrypt.compare(loginDto.password, user.password);

        if (!isValidPassword) {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    password: "incorrectPassword",
                },
            });
        }

        const hash = crypto
            .createHash("sha256")
            .update(randomStringGenerator())
            .digest("hex");

        const session = await this.sessionService.create({
            user,
            hash,
        });

        const { token, refreshToken, tokenExpires } = await this.getTokensData({
            id: user.id,
            sessionId: session.id,
            hash,
        });

        const plainUser = instanceToPlain(user, {
            groups: [ExposeGroup.Self],
            excludeExtraneousValues: false,
        }) as User;

        const validatedUser = UserSchema.parse(plainUser);

        return {
            refreshToken,
            token,
            tokenExpires,
            user: validatedUser,
        };
    }

    async validateSocialLogin(
        authProvider: string,
        socialData: SocialData,
    ): Promise<AuthLoginResponseDto> {
        let user: Nullable<User> = null;
        const socialEmail = socialData.email?.toLowerCase();
        let userByEmail: Nullable<User> = null;

        if (socialEmail) {
            userByEmail = await this.usersService.findByEmail(socialEmail);
        }

        if (socialData.id) {
            user = await this.usersService.findBySocialIdAndProvider({
                socialId: socialData.id,
                provider: authProvider,
            });
        }

        if (user) {
            if (socialEmail && !userByEmail) {
                user.email = socialEmail;
            }
            await this.usersService.update(user.id, user);
        } else if (userByEmail) {
            user = userByEmail;
        } else if (socialData.id) {
            const status = {
                id: Status.Active,
            };

            user = await this.usersService.create({
                email: socialEmail ?? null,
                firstName: socialData.firstName ?? null,
                lastName: socialData.lastName ?? null,
                socialId: socialData.id,
                provider: authProvider,
                status,
            });

            user = await this.usersService.findById(user.id);
        }

        if (!user) {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    user: "userNotFound",
                },
            });
        }

        const hash = crypto
            .createHash("sha256")
            .update(randomStringGenerator())
            .digest("hex");

        const session = await this.sessionService.create({
            user,
            hash,
        });

        const {
            token: jwtToken,
            refreshToken,
            tokenExpires,
        } = await this.getTokensData({
            id: user.id,
            sessionId: session.id,
            hash,
        });

        const plainUser = instanceToPlain(user, {
            groups: [ExposeGroup.Self],
            excludeExtraneousValues: false,
        }) as User;

        const validatedUser = UserSchema.parse(plainUser);

        return {
            refreshToken,
            token: jwtToken,
            tokenExpires,
            user: validatedUser,
        };
    }

    async register(dto: AuthRegisterDto): Promise<void> {
        const user = await this.usersService.create({
            ...dto,
            email: dto.email,
            status: {
                id: Status.Inactive,
            },
        });

        const hash = await this.jwtService.signAsync(
            {
                confirmEmailUserId: user.id,
            },
            {
                secret: this.configService.getOrThrow("auth.confirmEmailSecret", {
                    infer: true,
                }),
                expiresIn: this.configService.getOrThrow("auth.confirmEmailExpiration", {
                    infer: true,
                }),
            },
        );

        await this.mailService.userSignUp({
            to: dto.email,
            data: {
                hash,
            },
        });
    }

    async confirmEmail(hash: string): Promise<void> {
        let userId: User["id"];

        try {
            const jwtData = await this.jwtService.verifyAsync<{
                confirmEmailUserId: User["id"];
            }>(hash, {
                secret: this.configService.getOrThrow("auth.confirmEmailSecret", {
                    infer: true,
                }),
            });

            userId = jwtData.confirmEmailUserId;
        } catch {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    hash: "invalidHash",
                },
            });
        }

        const user = await this.usersService.findById(userId);

        if (!user || user?.status?.id?.toString() !== Status.Inactive.toString()) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                error: "notFound",
            });
        }

        user.status = {
            id: Status.Active,
        };

        await this.usersService.update(user.id, user);
    }

    async confirmNewEmail(hash: string): Promise<void> {
        let userId: User["id"];
        let newEmail: User["email"];

        try {
            const jwtData = await this.jwtService.verifyAsync<{
                confirmEmailUserId: User["id"];
                newEmail: User["email"];
            }>(hash, {
                secret: this.configService.getOrThrow("auth.confirmEmailSecret", {
                    infer: true,
                }),
            });

            userId = jwtData.confirmEmailUserId;
            newEmail = jwtData.newEmail;
        } catch {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    hash: "invalidHash",
                },
            });
        }

        const user = await this.usersService.findById(userId);

        if (!user) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                error: "notFound",
            });
        }

        user.email = newEmail;
        user.status = {
            id: Status.Active,
        };

        await this.usersService.update(user.id, user);
    }

    async forgotPassword(email: string): Promise<void> {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    email: "emailNotExists",
                },
            });
        }

        const tokenExpiresIn = this.configService.getOrThrow("auth.forgotExpiration", {
            infer: true,
        });

        const tokenExpires = Date.now() + ms(tokenExpiresIn);

        const hash = await this.jwtService.signAsync(
            {
                forgotUserId: user.id,
            },
            {
                secret: this.configService.getOrThrow("auth.forgotSecret", {
                    infer: true,
                }),
                expiresIn: tokenExpiresIn,
            },
        );

        await this.mailService.forgotPassword({
            to: email,
            data: {
                hash,
                tokenExpires,
            },
        });
    }

    async resetPassword(hash: string, password: string): Promise<void> {
        let userId: User["id"];

        try {
            const jwtData = await this.jwtService.verifyAsync<{
                forgotUserId: User["id"];
            }>(hash, {
                secret: this.configService.getOrThrow("auth.forgotSecret", {
                    infer: true,
                }),
            });

            userId = jwtData.forgotUserId;
        } catch {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    hash: "invalidHash",
                },
            });
        }

        const user = await this.usersService.findById(userId);

        if (!user) {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    hash: "notFound",
                },
            });
        }

        user.password = password;

        await this.sessionService.deleteByUserId({
            userId: user.id,
        });

        await this.usersService.update(user.id, user);
    }

    async me(userJwtPayload: JwtPayload): Promise<Nullable<User>> {
        return this.usersService.findById(userJwtPayload.id);
    }

    async update(
        userJwtPayload: JwtPayload,
        userDto: AuthUpdateDto,
    ): Promise<Nullable<User>> {
        const currentUser = await this.usersService.findById(userJwtPayload.id);

        if (!currentUser) {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    user: "userNotFound",
                },
            });
        }

        if (userDto.password) {
            if (!userDto.oldPassword) {
                throw new UnprocessableEntityException({
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        oldPassword: "missingOldPassword",
                    },
                });
            }

            if (!currentUser.password) {
                throw new UnprocessableEntityException({
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        oldPassword: "incorrectOldPassword",
                    },
                });
            }

            const isValidOldPassword = await bcrypt.compare(
                userDto.oldPassword,
                currentUser.password,
            );

            if (!isValidOldPassword) {
                throw new UnprocessableEntityException({
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        oldPassword: "incorrectOldPassword",
                    },
                });
            }

            await this.sessionService.deleteByUserIdWithExclude({
                userId: currentUser.id,
                excludeSessionId: userJwtPayload.sessionId,
            });
        }

        if (userDto.email && userDto.email !== currentUser.email) {
            const userByEmail = await this.usersService.findByEmail(userDto.email);

            if (userByEmail && userByEmail.id !== currentUser.id) {
                throw new UnprocessableEntityException({
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        email: "emailExists",
                    },
                });
            }

            const hash = await this.jwtService.signAsync(
                {
                    confirmEmailUserId: currentUser.id,
                    newEmail: userDto.email,
                },
                {
                    secret: this.configService.getOrThrow("auth.confirmEmailSecret", {
                        infer: true,
                    }),
                    expiresIn: this.configService.getOrThrow(
                        "auth.confirmEmailExpiration",
                        {
                            infer: true,
                        },
                    ),
                },
            );

            await this.mailService.confirmNewEmail({
                to: userDto.email,
                data: {
                    hash,
                },
            });
        }

        userDto.email = undefined;
        userDto.oldPassword = undefined;

        await this.usersService.update(userJwtPayload.id, userDto);

        return this.usersService.findById(userJwtPayload.id);
    }

    async refreshToken(
        data: Pick<JwtRefreshPayload, "sessionId" | "hash">,
    ): Promise<Omit<LoginResponseDto, "user">> {
        const session = await this.sessionService.findById(data.sessionId);

        console.log(session);

        if (!session) {
            console.log("invalid payload !session");
            throw new UnauthorizedException();
        }

        if (session.hash !== data.hash) {
            console.log("invalid payload session.hash !== data.hash");
            console.log(session.hash, " !== ", data.hash);
            throw new UnauthorizedException();
        }

        const hash = crypto
            .createHash("sha256")
            .update(randomStringGenerator())
            .digest("hex");

        await this.sessionService.update(session.id, {
            hash,
        });

        const { token, refreshToken, tokenExpires } = await this.getTokensData({
            id: session.user.id,
            sessionId: session.id,
            hash,
        });

        return {
            token,
            refreshToken,
            tokenExpires,
        };
    }

    async softDelete(user: User): Promise<void> {
        await this.usersService.remove(user.id);
    }

    async logout(data: Pick<JwtRefreshPayload, "sessionId">) {
        return this.sessionService.deleteById(data.sessionId);
    }

    private async getTokensData(data: {
        id: User["id"];
        sessionId: Session["id"];
        hash: Session["hash"];
    }) {
        const tokenExpiresIn = this.configService.getOrThrow("auth.expiration", {
            infer: true,
        });

        console.log(tokenExpiresIn);
        console.log(ms(tokenExpiresIn));

        const tokenExpires = Date.now() + ms(tokenExpiresIn);

        const [token, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    id: data.id,
                    sessionId: data.sessionId,
                },
                {
                    secret: this.configService.getOrThrow("auth.secret", {
                        infer: true,
                    }),
                    expiresIn: tokenExpiresIn,
                },
            ),

            this.jwtService.signAsync(
                {
                    sessionId: data.sessionId,
                    hash: data.hash,
                },
                {
                    secret: this.configService.getOrThrow("auth.refreshSecret", {
                        infer: true,
                    }),
                    expiresIn: this.configService.getOrThrow("auth.refreshExpiration", {
                        infer: true,
                    }),
                },
            ),
        ]);

        return {
            token,
            refreshToken,
            tokenExpires,
        };
    }
}
