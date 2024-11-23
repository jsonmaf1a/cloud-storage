import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { GeneralConfig } from "@/config/general.config";
import { JwtRefreshPayload } from "../types/jwt-refresh-payload";
import { OrNever } from "@cloud/shared";
import { Request } from "express";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor(configService: ConfigService<GeneralConfig>) {
        super({
            jwtFromRequest: (request: Request) => {
                return request.cookies.refreshToken;
            },
            ignoreExpiration: true,
            secretOrKey: configService.get("auth.refreshSecret", {
                infer: true,
            }),
        });
    }

    public validate(payload: JwtRefreshPayload) {
        console.log("validation", payload);

        if (!payload.sessionId) {
            console.log("validation");
            throw new UnauthorizedException();
        }

        return payload;
    }
}
