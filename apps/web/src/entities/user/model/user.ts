import { Nullable, StatusModel } from "@cloud/shared";
import { UserInterface } from "./user.interface";

export class User implements UserInterface {
    [key: string]: unknown; // outcome of zod's .passthrough() method

    constructor(
        public readonly id: number,
        public readonly email: Nullable<string>,
        public readonly provider: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly deletedAt: Nullable<Date>,
        public readonly firstName: Nullable<string>,
        public readonly lastName: Nullable<string>,
        public readonly socialId?: Nullable<string>,
        public readonly status?: StatusModel,
        public readonly avatarUrl?: Nullable<string>,
    ) {}

    getFullName() {
        return `${this.firstName || ""} ${this.lastName || ""}`.trim();
    }

    isActive() {
        return !this.deletedAt;
    }
}
