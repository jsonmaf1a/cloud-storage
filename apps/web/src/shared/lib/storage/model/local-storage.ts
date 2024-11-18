import { Nullable } from "@cloud/shared";
import { StorageService } from "./storage.interface";

export class LocalStorageService implements StorageService {
    getItem(key: string): Nullable<string> {
        return localStorage.getItem(key);
    }

    setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}
