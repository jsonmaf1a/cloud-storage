import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import authConfig from "./auth/config/auth.config";
import appConfig from "./config/app.config";
import { SessionModule } from "./session/session.module";
import { MailModule } from "./mail/mail.module";
import { MailerModule } from "./mailer/mailer.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import { TypeOrmConfigService } from "./database/typeorm-config.service";
import databaseConfig from "./database/config/database.config";
import mailConfig from "./mail/config/mail.config";
import { HeaderResolver, I18nModule } from "nestjs-i18n";
import { GeneralConfig } from "./config/general.config";
import path from "node:path";

const ENV_FILE_PATH = ".env";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, authConfig, databaseConfig, mailConfig], // NOTE: dont forget to load other configs
            envFilePath: [ENV_FILE_PATH],
        }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
            dataSourceFactory: async (options: DataSourceOptions) => {
                return new DataSource(options).initialize();
            },
        }),
        UsersModule,
        AuthModule,
        SessionModule,
        MailModule,
        MailerModule,
    ],
})
export class AppModule {}
