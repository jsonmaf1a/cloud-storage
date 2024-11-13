import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { GeneralConfig } from "@/config/general.config";
import { JwtRefreshPayload } from "../types/jwt-refresh-payload";
import { OrNever } from "@cloud/shared";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    "jwt-refresh",
) {
    constructor(configService: ConfigService<GeneralConfig>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("auth.refreshSecret", {
                infer: true,
            }),
        });
    }

    public validate(payload: JwtRefreshPayload): OrNever<JwtRefreshPayload> {
        if (!payload.sessionId) {
            throw new UnauthorizedException();
        }

        return payload;
    }
}
