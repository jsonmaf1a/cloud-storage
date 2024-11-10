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
import { AuthService } from "./auth.service";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ExposeGroup } from "@/common/enums/expose-group";
import { LoginResponseDto } from "./dto/login-response.dto";
import { AuthEmailLoginDto } from "./dto/auth-email-login.dto";
import { AuthRegisterLoginDto } from "./dto/auth-register-login.dto";
import { AuthConfirmEmailDto } from "./dto/auth-confirm-email.dto";
import { AuthForgotPasswordDto } from "./dto/auth-forgot-password";
import { AuthResetPasswordDto } from "./dto/auth-reset-password.dto";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@/users/domain/user";
import { Nullable } from "@/common/types/nullable";
import { RefreshResponseDto } from "./dto/refresh-response.dto";
import { AuthUpdateDto } from "./dto/auth-update.dto";

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
    public login(
        @Body() loginDto: AuthEmailLoginDto,
    ): Promise<LoginResponseDto> {
        return this.service.validateLogin(loginDto);
    }

    @Post("email/register")
    @HttpCode(HttpStatus.NO_CONTENT)
    async register(@Body() createUserDto: AuthRegisterLoginDto): Promise<void> {
        return this.service.register(createUserDto);
    }

    @Post("email/confirm")
    @HttpCode(HttpStatus.NO_CONTENT)
    async confirmEmail(
        @Body() confirmEmailDto: AuthConfirmEmailDto,
    ): Promise<void> {
        return this.service.confirmEmail(confirmEmailDto.hash);
    }

    @Post("email/confirm/new")
    @HttpCode(HttpStatus.NO_CONTENT)
    async confirmNewEmail(
        @Body() confirmEmailDto: AuthConfirmEmailDto,
    ): Promise<void> {
        return this.service.confirmNewEmail(confirmEmailDto.hash);
    }

    @Post("forgot/password")
    @HttpCode(HttpStatus.NO_CONTENT)
    async forgotPassword(
        @Body() forgotPasswordDto: AuthForgotPasswordDto,
    ): Promise<void> {
        return this.service.forgotPassword(forgotPasswordDto.email);
    }

    @Post("reset/password")
    @HttpCode(HttpStatus.NO_CONTENT)
    resetPassword(
        @Body() resetPasswordDto: AuthResetPasswordDto,
    ): Promise<void> {
        return this.service.resetPassword(
            resetPasswordDto.hash,
            resetPasswordDto.password,
        );
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
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    public me(@Request() request: any): Promise<Nullable<User>> {
        return this.service.me(request.user);
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
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    public refresh(@Request() request: any): Promise<RefreshResponseDto> {
        return this.service.refreshToken({
            sessionId: request.user.sessionId,
            hash: request.user.hash,
        });
    }

    @ApiBearerAuth()
    @Post("logout")
    @UseGuards(AuthGuard("jwt"))
    @HttpCode(HttpStatus.NO_CONTENT)
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    public async logout(@Request() request: any): Promise<void> {
        await this.service.logout({
            sessionId: request.user.sessionId,
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
    public update(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        @Request() request: any,
        @Body() userDto: AuthUpdateDto,
    ): Promise<Nullable<User>> {
        return this.service.update(request.user, userDto);
    }

    @ApiBearerAuth()
    @Delete("me")
    @UseGuards(AuthGuard("jwt"))
    @HttpCode(HttpStatus.NO_CONTENT)
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    public async delete(@Request() request: any): Promise<void> {
        return this.service.softDelete(request.user);
    }
}
