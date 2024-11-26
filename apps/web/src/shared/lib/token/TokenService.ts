import { Nullable } from "@cloud/shared";
import { STORAGE_KEYS } from "@/shared/constants";

export class TokenService {
    private keys = STORAGE_KEYS.AUTH;

    public getStoredToken(): Nullable<string> {
        return localStorage.getItem(this.keys.TOKEN);
    }

    public getStoredTokenExpiration(): Nullable<number> {
        const expires = localStorage.getItem(this.keys.TOKEN_EXPIRES);
        return expires ? Number.parseInt(expires) : null;
    }

    public store(token: string, tokenExpiration: number): void {
        localStorage.setItem(this.keys.TOKEN, token);
        localStorage.setItem(this.keys.TOKEN_EXPIRES, tokenExpiration.toString());
    }

    public clear(): void {
        localStorage.removeItem(this.keys.TOKEN);
        localStorage.removeItem(this.keys.TOKEN_EXPIRES);
    }
}

export const tokenService = new TokenService();
