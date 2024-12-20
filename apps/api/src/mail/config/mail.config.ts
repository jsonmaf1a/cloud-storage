import validateConfig from "@/common/utils/validate-config";
import { PORT_MAX_VALUE, PORT_MIN_VALUE } from "@/config/consts";
import { registerAs } from "@nestjs/config";
import {
    IsBoolean,
    IsEmail,
    IsInt,
    IsOptional,
    IsString,
    Max,
    Min,
} from "class-validator";

export type MailConfig = {
    port: number;
    host?: string;
    user?: string;
    password?: string;
    defaultEmail?: string;
    defaultName?: string;
    ignoreTLS: boolean;
    secure: boolean;
    requireTLS: boolean;
};

class EnvValidator {
    @IsInt()
    @Min(PORT_MIN_VALUE)
    @Max(PORT_MAX_VALUE)
    @IsOptional()
    MAIL_PORT: number;

    @IsString()
    MAIL_HOST: string;

    @IsString()
    @IsOptional()
    MAIL_USER: string;

    @IsString()
    @IsOptional()
    MAIL_PASSWORD: string;

    @IsEmail()
    MAIL_DEFAULT_EMAIL: string;

    @IsString()
    MAIL_DEFAULT_NAME: string;

    @IsBoolean()
    MAIL_IGNORE_TLS: boolean;

    @IsBoolean()
    MAIL_SECURE: boolean;

    @IsBoolean()
    MAIL_REQUIRE_TLS: boolean;
}

export default registerAs<MailConfig>("mail", () => {
    validateConfig(process.env, EnvValidator);
    return {
        port: process.env.MAIL_PORT ? Number.parseInt(process.env.MAIL_PORT) : 1025,
        host: process.env.MAIL_HOST,
        user: process.env.MAIL_USER,
        password: process.env.MAIL_PASSWORD,
        defaultEmail: process.env.MAIL_DEFAULT_EMAIL,
        defaultName: process.env.MAIL_DEFAULT_NAME,
        ignoreTLS: process.env.MAIL_IGNORE_TLS === "true",
        secure: process.env.MAIL_SECURE === "true",
        requireTLS: process.env.MAIL_REQUIRE_TLS === "true",
    };
});
