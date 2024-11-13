import validateConfig from "@/common/utils/validate-config";
import { PORT_MAX_VALUE, PORT_MIN_VALUE } from "@/config/consts";
import { registerAs } from "@nestjs/config";

import {
    IsOptional,
    IsInt,
    Min,
    Max,
    IsString,
    IsBoolean,
} from "class-validator";

export type DatabaseConfig = {
    url?: string;
    type?: string;
    host?: string;
    port?: number;
    password?: string;
    name?: string;
    username?: string;
    synchronize?: boolean;
    maxConnections: number;
    sslEnabled?: boolean;
    rejectUnauthorized?: boolean;
    ca?: string;
    key?: string;
    cert?: string;
};

class EnvValidator {
    @IsString()
    DATABASE_URL: string;

    @IsString()
    DATABASE_TYPE: string;

    @IsString()
    DATABASE_HOST: string;

    @IsInt()
    @Min(PORT_MIN_VALUE)
    @Max(PORT_MAX_VALUE)
    DATABASE_PORT: number;

    @IsString()
    DATABASE_PASSWORD: string;

    @IsString()
    DATABASE_NAME: string;

    @IsString()
    DATABASE_USERNAME: string;

    @IsBoolean()
    @IsOptional()
    DATABASE_SYNCHRONIZE: boolean;

    @IsInt()
    @IsOptional()
    DATABASE_MAX_CONNECTIONS: number;

    @IsBoolean()
    @IsOptional()
    DATABASE_SSL_ENABLED: boolean;

    @IsBoolean()
    @IsOptional()
    DATABASE_REJECT_UNAUTHORIZED: boolean;

    @IsString()
    @IsOptional()
    DATABASE_CA: string;

    @IsString()
    @IsOptional()
    DATABASE_KEY: string;

    @IsString()
    @IsOptional()
    DATABASE_CERT: string;
}

export default registerAs<DatabaseConfig>("database", () => {
    validateConfig(process.env, EnvValidator);

    return {
        url: process.env.DATABASE_URL,
        type: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT
            ? Number.parseInt(process.env.DATABASE_PORT, 10)
            : 5432,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        synchronize: process.env.DATABASE_SYNCHRONIZE === "true",
        maxConnections: process.env.DATABASE_MAX_CONNECTIONS
            ? Number.parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
            : 100,
        sslEnabled: process.env.DATABASE_SSL_ENABLED === "true",
        rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === "true",
        ca: process.env.DATABASE_CA,
        key: process.env.DATABASE_KEY,
        cert: process.env.DATABASE_CERT,
    };
});
