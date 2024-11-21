import { Nullable } from "@cloud/shared";

export interface StorageService {
    getItem(key: string): Nullable<string>;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}
