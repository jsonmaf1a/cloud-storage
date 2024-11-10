import { AuthConfig } from "@/auth/config/auth.config";
import { AppConfig } from "./app.config";
import { MailConfig } from "@/mail/config/mail.config";
import { DatabaseConfig } from "@/database/config/database.config";

export type GeneralConfig = {
    app: AppConfig;
    auth: AuthConfig;
    mail: MailConfig;
    database: DatabaseConfig;
};
