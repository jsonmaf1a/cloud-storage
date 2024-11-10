import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "@/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { SessionModule } from "@/session/session.module";
import { MailModule } from "@/mail/mail.module";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({}),
        SessionModule,
        MailModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
    exports: [AuthService],
})
export class AuthModule {}
