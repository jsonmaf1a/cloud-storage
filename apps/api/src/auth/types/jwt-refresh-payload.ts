import { Session } from "@/session/domain/session";

export type JwtRefreshPayload = {
    sessionId: Session["id"];
    hash: Session["hash"];
    iat: number;
    exp: number;
};
