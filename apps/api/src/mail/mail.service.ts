import { Maybe } from "@cloud/shared";
import { GeneralConfig } from "@/config/general.config";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { I18nContext } from "nestjs-i18n";
import path from "node:path";
import { MailerService } from "@/mailer/mailer.service";
import { MailData } from "./types/mail-data";

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService<GeneralConfig>,
    ) {}

    async userSignUp(mailData: MailData<{ hash: string }>): Promise<void> {
        const i18n = I18nContext.current();
        let emailConfirmTitle: Maybe<string>;
        let text1: Maybe<string>;
        let text2: Maybe<string>;
        let text3: Maybe<string>;

        if (i18n) {
            [emailConfirmTitle, text1, text2, text3] = await Promise.all([
                i18n.t("common.confirmEmail"),
                i18n.t("confirm-email.text1"),
                i18n.t("confirm-email.text2"),
                i18n.t("confirm-email.text3"),
            ]);
        }

        const url = new URL(
            `${this.configService.getOrThrow("app.frontendDomain", {
                infer: true,
            })}/confirm-email`,
        );
        url.searchParams.set("hash", mailData.data.hash);

        await this.mailerService.sendMail({
            to: mailData.to,
            subject: emailConfirmTitle,
            text: `${url.toString()} ${emailConfirmTitle}`,
            templatePath: path.join(
                this.configService.getOrThrow("app.workingDirectory", {
                    infer: true,
                }),
                "src",
                "mail",
                "templates",
                "activation.hbs",
            ),
            context: {
                title: emailConfirmTitle,
                url: url.toString(),
                actionTitle: emailConfirmTitle,
                app_name: this.configService.get("app.name", { infer: true }),
                text1,
                text2,
                text3,
            },
        });
    }

    async forgotPassword(
        mailData: MailData<{ hash: string; tokenExpires: number }>,
    ): Promise<void> {
        const i18n = I18nContext.current();
        let resetPasswordTitle: Maybe<string>;
        let text1: Maybe<string>;
        let text2: Maybe<string>;
        let text3: Maybe<string>;
        let text4: Maybe<string>;

        if (i18n) {
            [resetPasswordTitle, text1, text2, text3, text4] =
                await Promise.all([
                    i18n.t("common.resetPassword"),
                    i18n.t("reset-password.text1"),
                    i18n.t("reset-password.text2"),
                    i18n.t("reset-password.text3"),
                    i18n.t("reset-password.text4"),
                ]);
        }

        const url = new URL(
            `${this.configService.getOrThrow("app.frontendDomain", {
                infer: true,
            })}/password-change`,
        );
        url.searchParams.set("hash", mailData.data.hash);
        url.searchParams.set("expires", mailData.data.tokenExpires.toString());

        await this.mailerService.sendMail({
            to: mailData.to,
            subject: resetPasswordTitle,
            text: `${url.toString()} ${resetPasswordTitle}`,
            templatePath: path.join(
                this.configService.getOrThrow("app.workingDirectory", {
                    infer: true,
                }),
                "src",
                "mail",
                "templates",
                "reset-password.hbs",
            ),
            context: {
                title: resetPasswordTitle,
                url: url.toString(),
                actionTitle: resetPasswordTitle,
                app_name: this.configService.get("app.name", {
                    infer: true,
                }),
                text1,
                text2,
                text3,
                text4,
            },
        });
    }

    async confirmNewEmail(mailData: MailData<{ hash: string }>): Promise<void> {
        const i18n = I18nContext.current();
        let emailConfirmTitle: Maybe<string>;
        let text1: Maybe<string>;
        let text2: Maybe<string>;
        let text3: Maybe<string>;

        if (i18n) {
            [emailConfirmTitle, text1, text2, text3] = await Promise.all([
                i18n.t("common.confirmEmail"),
                i18n.t("confirm-new-email.text1"),
                i18n.t("confirm-new-email.text2"),
                i18n.t("confirm-new-email.text3"),
            ]);
        }

        const url = new URL(
            `${this.configService.getOrThrow("app.frontendDomain", {
                infer: true,
            })}/confirm-new-email`,
        );
        url.searchParams.set("hash", mailData.data.hash);

        await this.mailerService.sendMail({
            to: mailData.to,
            subject: emailConfirmTitle,
            text: `${url.toString()} ${emailConfirmTitle}`,
            templatePath: path.join(
                this.configService.getOrThrow("app.workingDirectory", {
                    infer: true,
                }),
                "src",
                "mail",
                "templates",
                "confirm-new-email.hbs",
            ),
            context: {
                title: emailConfirmTitle,
                url: url.toString(),
                actionTitle: emailConfirmTitle,
                app_name: this.configService.get("app.name", { infer: true }),
                text1,
                text2,
                text3,
            },
        });
    }
}
