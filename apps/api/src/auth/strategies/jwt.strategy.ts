import { GeneralConfig } from "@/config/general.config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../types/jwt-payload";
import { OrNever } from "@/common/types/or-never";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(configService: ConfigService<GeneralConfig>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("auth.secret", { infer: true }),
        });
    }

    public validate(payload: JwtPayload): OrNever<JwtPayload> {
        if (!payload.id) {
            throw new UnauthorizedException();
        }

        return payload;
    }
}
