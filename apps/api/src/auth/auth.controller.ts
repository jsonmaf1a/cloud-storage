import { JwtRefreshRequest, JwtRequest } from "@/common/types/request";
import { User } from "@/users/domain/user";
import { AuthContract, UserSchema } from "@cloud/shared";
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Patch,
    Post,
    Request,
    Res,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { TsRestException, TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { CookieOptions, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthConfirmEmailDto } from "./dto/auth-confirm-email.dto";
import { AuthForgotPasswordDto } from "./dto/auth-forgot-password";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthResetPasswordDto } from "./dto/auth-reset-password.dto";
import { AuthUpdateDto } from "./dto/auth-update.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { RefreshResponseDto } from "./dto/refresh-response.dto";

const c = AuthContract;

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    private readonly REFRESH_TOKEN_COOKIE_KEY = "refreshToken";
    private readonly REFRESH_TOKEN_COOKIE_OPTS = {
        httpOnly: true,
        sameSite: "none" as const,
        secure: true,
    };

    constructor(private readonly service: AuthService) {}

    @Post("email/login")
    @ApiOkResponse({
        type: LoginResponseDto,
    })
    @HttpCode(HttpStatus.OK)
    @TsRestHandler(c.emailLogin)
    async login(
        @Body() loginDto: AuthLoginDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        return tsRestHandler(c.emailLogin, async () => {
            const { refreshToken, ...data } = await this.service.validateLogin(loginDto);

            this.setCookie(
                res,
                this.REFRESH_TOKEN_COOKIE_KEY,
                refreshToken,
                this.REFRESH_TOKEN_COOKIE_OPTS,
            );
            return {
                status: HttpStatus.OK,
                body: data,
            };
        });
    }

    @Post("email/register")
    @HttpCode(HttpStatus.CREATED)
    @TsRestHandler(c.emailRegister)
    async register(
        @Body() createUserDto: AuthRegisterDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        return tsRestHandler(c.emailRegister, async () => {
            await this.service.register(createUserDto);

            const { refreshToken, ...data } = await this.service.validateLogin({
                email: createUserDto.email,
                password: createUserDto.password,
            });

            this.setCookie(
                res,
                this.REFRESH_TOKEN_COOKIE_KEY,
                refreshToken,
                this.REFRESH_TOKEN_COOKIE_OPTS,
            );
            return {
                status: HttpStatus.CREATED,
                body: data,
            };
        });
    }

    @Post("email/confirm")
    @HttpCode(HttpStatus.NO_CONTENT)
    @TsRestHandler(c.confirmEmail)
    async confirmEmail(@Body() confirmEmailDto: AuthConfirmEmailDto) {
        return tsRestHandler(c.confirmEmail, async () => {
            await this.service.confirmEmail(confirmEmailDto.hash);

            return {
                status: 204,
                body: undefined,
            };
        });
    }

    @Post("email/confirm/new")
    @HttpCode(HttpStatus.NO_CONTENT)
    @TsRestHandler(c.confirmNewEmail)
    async confirmNewEmail(@Body() confirmEmailDto: AuthConfirmEmailDto) {
        return tsRestHandler(c.confirmNewEmail, async () => {
            await this.service.confirmNewEmail(confirmEmailDto.hash);

            return {
                status: 204,
                body: undefined,
            };
        });
    }

    @Post("forgot/password")
    @HttpCode(HttpStatus.NO_CONTENT)
    @TsRestHandler(c.forgotPassword)
    async forgotPassword(@Body() forgotPasswordDto: AuthForgotPasswordDto) {
        return tsRestHandler(c.forgotPassword, async () => {
            await this.service.forgotPassword(forgotPasswordDto.email);

            return {
                status: HttpStatus.NO_CONTENT,
                body: undefined,
            };
        });
    }

    @Post("reset/password")
    @HttpCode(HttpStatus.NO_CONTENT)
    @TsRestHandler(c.resetPassword)
    async resetPassword(@Body() resetPasswordDto: AuthResetPasswordDto) {
        return tsRestHandler(c.resetPassword, async () => {
            await this.service.resetPassword(
                resetPasswordDto.hash,
                resetPasswordDto.password,
            );
            return {
                status: HttpStatus.NO_CONTENT,
                body: undefined,
            };
        });
    }

    @ApiBearerAuth()
    @Get("me")
    @UseGuards(AuthGuard("jwt"))
    @ApiOkResponse({
        type: User,
    })
    @HttpCode(HttpStatus.OK)
    @TsRestHandler(c.me)
    async me(@Request() req: JwtRequest) {
        return tsRestHandler(c.me, async () => {
            const user = await this.service.me(req.user);
            if (!user) {
                throw new TsRestException(c.me, {
                    status: HttpStatus.NOT_FOUND,
                    body: {
                        code: "UserNotFound",
                        message: "User with requested ID is not found",
                    },
                });
            }

            const validatedUser = await UserSchema.parseAsync(user);

            return {
                status: HttpStatus.OK,
                body: validatedUser,
            };
        });
    }

    @ApiBearerAuth()
    @ApiOkResponse({
        type: RefreshResponseDto,
    })
    @Post("refresh")
    @UseGuards(AuthGuard("jwt-refresh"))
    @HttpCode(HttpStatus.OK)
    @TsRestHandler(c.refresh)
    async refresh(
        @Request() request: JwtRefreshRequest,
        @Res({ passthrough: true }) res: Response,
    ) {
        return tsRestHandler(c.refresh, async () => {
            const { refreshToken, ...data } = await this.service.refreshToken({
                sessionId: request.user.sessionId,
                hash: request.user.hash,
            });

            this.setCookie(
                res,
                this.REFRESH_TOKEN_COOKIE_KEY,
                refreshToken,
                this.REFRESH_TOKEN_COOKIE_OPTS,
            );
            return {
                status: HttpStatus.OK,
                body: data,
            };
        });
    }

    @ApiBearerAuth()
    @Post("logout")
    @UseGuards(AuthGuard("jwt"))
    @HttpCode(HttpStatus.NO_CONTENT)
    @TsRestHandler(c.logout)
    public async logout(@Request() request: JwtRequest) {
        return tsRestHandler(c.logout, async () => {
            await this.service.logout({
                sessionId: request.user.sessionId,
            });

            return {
                status: HttpStatus.NO_CONTENT,
                body: undefined,
            };
        });
    }

    @ApiBearerAuth()
    @Patch("me")
    @UseGuards(AuthGuard("jwt"))
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: User,
    })
    @TsRestHandler(c.updateMe)
    async update(@Request() request: JwtRequest, @Body() userDto: AuthUpdateDto) {
        return tsRestHandler(c.updateMe, async () => {
            const user = await this.service.update(request.user, userDto);

            if (!user) {
                throw new TsRestException(c.me, {
                    status: HttpStatus.NOT_FOUND,
                    body: {
                        code: "UserNotFound",
                        message: "User with requested ID is not found",
                    },
                });
            }

            const validatedUser = UserSchema.parse(user);

            return {
                status: HttpStatus.OK,
                body: validatedUser,
            };
        });
    }

    @ApiBearerAuth()
    @Delete("me")
    @UseGuards(AuthGuard("jwt"))
    @HttpCode(HttpStatus.NO_CONTENT)
    @TsRestHandler(c.deleteMe)
    async delete(@Request() request: JwtRequest) {
        return tsRestHandler(c.deleteMe, async () => {
            await this.service.softDelete(request.user.id);

            return {
                status: HttpStatus.NO_CONTENT,
                body: undefined,
            };
        });
    }

    private setCookie(res: Response, key: string, value: string, opts: CookieOptions) {
        res.cookie(key, value, opts);
    }
}
