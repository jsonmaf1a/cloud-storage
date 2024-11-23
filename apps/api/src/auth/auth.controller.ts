import { ExposeGroup } from "@/common/enums/expose-group";
import { JwtRefreshRequest, JwtRequest } from "@/common/types/request";
import { User } from "@/users/domain/user";
import {
    AuthContract,
    AuthLoginResponseDtoSchema,
    AuthRefreshResponseDtoSchema,
} from "@cloud/shared";
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
    SerializeOptions,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { TsRestException, TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { Response } from "express";
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

    constructor(private readonly service: AuthService) {}

    @SerializeOptions({
        groups: [ExposeGroup.Self],
    })
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

            const validatedData = AuthLoginResponseDtoSchema.parse(data);

            res.cookie(this.REFRESH_TOKEN_COOKIE_KEY, refreshToken, { httpOnly: true });
            return {
                status: HttpStatus.OK,
                body: validatedData,
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

            const validatedData = AuthLoginResponseDtoSchema.parse(data);

            res.cookie(this.REFRESH_TOKEN_COOKIE_KEY, refreshToken, { httpOnly: true });
            return {
                status: HttpStatus.CREATED,
                body: validatedData,
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
    @SerializeOptions({
        groups: [ExposeGroup.Self],
    })
    @Get("me")
    @UseGuards(AuthGuard("jwt"))
    @ApiOkResponse({
        type: User,
    })
    @HttpCode(HttpStatus.OK)
    @TsRestHandler(c.me)
    async me(@Request() req: JwtRequest) {
        return tsRestHandler(c.me, async () => {
            const _user = await this.service.me(req.user);
            if (!_user) {
                throw new TsRestException(c.me, {
                    status: HttpStatus.NOT_FOUND,
                    body: {
                        code: "UserNotFound",
                        message: "User with requested ID is not found",
                    },
                });
            }

            const user = {
                ..._user,
                status: _user.status
                    ? { id: _user.status.id, name: _user.status.name }
                    : undefined,
            };

            return {
                status: HttpStatus.OK,
                body: user,
            };
        });
    }

    @ApiBearerAuth()
    @ApiOkResponse({
        type: RefreshResponseDto,
    })
    @SerializeOptions({
        groups: [ExposeGroup.Self],
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

            const validatedData = AuthRefreshResponseDtoSchema.parse(data);

            res.cookie(this.REFRESH_TOKEN_COOKIE_KEY, refreshToken, { httpOnly: true });
            return {
                status: HttpStatus.OK,
                body: validatedData,
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
    @SerializeOptions({
        groups: [ExposeGroup.Self],
    })
    @Patch("me")
    @UseGuards(AuthGuard("jwt"))
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: User,
    })
    @TsRestHandler(c.updateMe)
    async update(@Request() request: JwtRequest, @Body() userDto: AuthUpdateDto) {
        return tsRestHandler(c.updateMe, async () => {
            const _user = await this.service.update(request.user, userDto);

            if (!_user) {
                throw new TsRestException(c.me, {
                    status: HttpStatus.NOT_FOUND,
                    body: {
                        code: "UserNotFound",
                        message: "User with requested ID is not found",
                    },
                });
            }

            const user = {
                ..._user,
                status: _user.status
                    ? { id: _user.status.id, name: _user.status.name }
                    : undefined,
            };

            return {
                status: HttpStatus.OK,
                body: user,
            };
        });
    }

    @ApiBearerAuth()
    @Delete("me")
    @UseGuards(AuthGuard("jwt"))
    @HttpCode(HttpStatus.NO_CONTENT)
    @TsRestHandler(c.deleteMe)
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    async delete(@Request() request: any) {
        return tsRestHandler(c.deleteMe, async () => {
            await this.service.softDelete(request.session);

            return {
                status: HttpStatus.NO_CONTENT,
                body: undefined,
            };
        });
    }
}
