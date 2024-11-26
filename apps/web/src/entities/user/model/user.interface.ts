import { User as BaseUser } from "@cloud/shared";

export interface UserInterface extends BaseUser {
    getFullName: () => string;
    isActive: () => boolean;
}
