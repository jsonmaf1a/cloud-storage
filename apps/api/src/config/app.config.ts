import validateConfig from "@/common/utils/validate-config";
import { registerAs } from "@nestjs/config";
import {
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    IsUrl,
    Max,
    Min,
} from "class-validator";
import { PORT_MAX_VALUE, PORT_MIN_VALUE } from "./consts";

export type AppConfig = {
    nodeEnv: string;
    name: string;
    workingDirectory: string;
    frontendDomain?: string;
    backendDomain: string;
    port: number;
    apiPrefix: string;
    fallbackLanguage: string;
    headerLanguage: string;
};
const Env = {
    Development: "development",
    Production: "production",
    Test: "test",
} as const;

type Env = keyof typeof Env;

class EnvValidator {
    @IsEnum(Env)
    @IsOptional()
    NODE_ENV: Env;

    @IsInt()
    @Min(PORT_MIN_VALUE)
    @Max(PORT_MAX_VALUE)
    @IsOptional()
    APP_PORT: number;

    @IsUrl({ require_tld: false })
    @IsOptional()
    FRONTEND_DOMAIN: string;

    @IsUrl({ require_tld: false })
    @IsOptional()
    BACKEND_DOMAIN: string;

    @IsString()
    @IsOptional()
    API_PREFIX: string;

    @IsString()
    @IsOptional()
    APP_FALLBACK_LANGUAGE: string;

    @IsString()
    @IsOptional()
    APP_HEADER_LANGUAGE: string;
}

export default registerAs<AppConfig>("app", () => {
    validateConfig(process.env, EnvValidator);

    return {
        nodeEnv: process.env.NODE_ENV || "development",
        name: process.env.APP_NAME || "app",
        workingDirectory: process.env.PWD || process.cwd(),
        frontendDomain: process.env.FRONTEND_DOMAIN,
        backendDomain: process.env.BACKEND_DOMAIN ?? "http://localhost",
        port: process.env.APP_PORT
            ? Number.parseInt(process.env.APP_PORT, 10)
            : 3000,
        apiPrefix: process.env.API_PREFIX || "api",
        fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || "en",
        headerLanguage: process.env.APP_HEADER_LANGUAGE || "x-custom-lang",
    };
});
