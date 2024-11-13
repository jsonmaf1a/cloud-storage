import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DataSource, DataSourceOptions } from "typeorm";
import { StatusSeedModule } from "./status/status-seed.module";
import databaseConfig from "../config/database.config";
import appConfig from "@/config/app.config";
import { TypeOrmConfigService } from "../typeorm-config.service";
import { UserSeedModule } from "./user/user-seed.module";

@Module({
    imports: [
        StatusSeedModule,
        UserSeedModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig, appConfig],
            envFilePath: [".env"],
        }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
            dataSourceFactory: async (
                options: DataSourceOptions | undefined,
            ) => {
                if (!options) {
                    throw new Error("DataSource options are not provided.");
                }

                return new DataSource(options).initialize();
            },
        }),
    ],
})
export class SeedModule {}
