import validateConfig from "@/common/utils/validate-config";
import { registerAs } from "@nestjs/config";

import { IsString } from "class-validator";

export type AuthConfig = {
    secret?: string;
    accessExpiration?: string;
    refreshSecret?: string;
    refreshExpiration?: string;
    forgotSecret?: string;
    forgotExpiration?: string;
    confirmEmailSecret?: string;
    confirmEmailExpiration?: string;
};

class EnvValidator {
    @IsString()
    AUTH_JWT_SECRET: string;

    @IsString()
    AUTH_JWT_TOKEN_EXPIRATION: string;

    @IsString()
    AUTH_REFRESH_SECRET: string;

    @IsString()
    AUTH_REFRESH_TOKEN_EXPIRATION: string;

    @IsString()
    AUTH_FORGOT_SECRET: string;

    @IsString()
    AUTH_FORGOT_TOKEN_EXPIRATION: string;

    @IsString()
    AUTH_CONFIRM_EMAIL_SECRET: string;

    @IsString()
    AUTH_CONFIRM_EMAIL_TOKEN_EXPIRATION: string;
}

export default registerAs<AuthConfig>("auth", () => {
    validateConfig(process.env, EnvValidator);

    return {
        secret: process.env.AUTH_JWT_SECRET,
        accessExpiration: process.env.AUTH_JWT_TOKEN_EXPIRATION,
        refreshSecret: process.env.AUTH_REFRESH_SECRET,
        refreshExpiration: process.env.AUTH_REFRESH_TOKEN_EXPIRATION,
        forgotSecret: process.env.AUTH_FORGOT_SECRET,
        forgotExpiration: process.env.AUTH_FORGOT_TOKEN_EXPIRATION,
        confirmEmailSecret: process.env.AUTH_CONFIRM_EMAIL_SECRET,
        confirmEmailExpiration: process.env.AUTH_CONFIRM_EMAIL_TOKEN_EXPIRATION,
    };
});
