import { Session } from "@/session/domain/session";
import { User } from "@/users/domain/user";

export type JwtPayload = Pick<User, "id"> & {
    sessionId: Session["id"];
    iat: number;
    exp: number;
};
