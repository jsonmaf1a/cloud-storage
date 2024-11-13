import { Request } from "express";
import { JwtRefreshPayload } from "@/auth/types/jwt-refresh-payload";
import { JwtPayload } from "@/auth/types/jwt-payload";

export interface JwtRefreshRequest extends Request {
    user: JwtRefreshPayload;
}

export interface JwtRequest extends Request {
    user: JwtPayload;
}
