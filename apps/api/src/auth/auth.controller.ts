import { ExposeGroup } from "@/common/enums/expose-group";
import { User } from "@/users/domain/user";
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
    SerializeOptions,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import {
    TsRest,
    TsRestException,
    TsRestHandler,
    tsRestHandler,
} from "@ts-rest/nest";
import { AuthService } from "./auth.service";
import { AuthConfirmEmailDto } from "./dto/auth-confirm-email.dto";
import { AuthForgotPasswordDto } from "./dto/auth-forgot-password";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthResetPasswordDto } from "./dto/auth-reset-password.dto";
import { AuthUpdateDto } from "./dto/auth-update.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { RefreshResponseDto } from "./dto/refresh-response.dto";
import { JwtRefreshRequest, JwtRequest } from "@/common/types/request";
import { AuthContract } from "@cloud/shared";

const c = AuthContract;

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @SerializeOptions({
        groups: [ExposeGroup.Self],
    })
    @Post("email/login")
    @ApiOkResponse({
        type: LoginResponseDto,
    })
    @HttpCode(HttpStatus.OK)
    @TsRest(c.emailLogin)
    async login(@Body() loginDto: AuthLoginDto): Promise<LoginResponseDto> {
        return this.service.validateLogin(loginDto);
    }

    @Post("email/register")
    @HttpCode(HttpStatus.CREATED)
    @TsRestHandler(c.emailRegister)
    async register(@Body() createUserDto: AuthRegisterDto) {
        return tsRestHandler(c.emailRegister, async () => {
            await this.service.register(createUserDto);

            return {
                status: HttpStatus.CREATED,
                body: undefined,
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
    async refresh(@Request() request: JwtRefreshRequest) {
        return tsRestHandler(c.refresh, async () => {
            const data = await this.service.refreshToken({
                sessionId: request.user.sessionId,
                hash: request.user.hash,
            });

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
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    public async logout(@Request() request: any) {
        return tsRestHandler(c.logout, async () => {
            await this.service.logout({
                sessionId: request.session.sessionId,
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
    async update(
        @Request() request: JwtRequest,
        @Body() userDto: AuthUpdateDto,
    ) {
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
