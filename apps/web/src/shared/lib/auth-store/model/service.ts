import { Nullable, User } from "@cloud/shared";
import { AUTH_STORAGE_KEYS } from "../config/constants";
import { StorageService } from "@/shared/lib/storage/model/storage.interface";

export class AuthService {
    constructor(private storage: StorageService) {}

    getStoredToken(): Nullable<string> {
        return this.storage.getItem(AUTH_STORAGE_KEYS.TOKEN);
    }

    getStoredTokenExpires(): Nullable<number> {
        const expires = this.storage.getItem(AUTH_STORAGE_KEYS.TOKEN_EXPIRES);
        return expires ? Number.parseInt(expires) : null;
    }

    storeSession(token: string, tokenExpires: number): void {
        localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, token);
        localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN_EXPIRES, tokenExpires.toString());
    }

    clearSession(): void {
        localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
        localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN_EXPIRES);
    }
}
