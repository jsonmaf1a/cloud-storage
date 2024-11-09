import { Nullable } from "@/common/types/nullable";
import { PaginationOptions } from "@/common/types/pagination-options";
import { User } from "@/users/domain/user";
import { SortUserDto } from "@/users/dto/query-user.dto";
import { DeepPartial } from "typeorm";

export abstract class UserRepository {
    abstract create(
        data: Omit<User, "id" | "createdAt" | "deletedAt" | "updatedAt">,
    ): Promise<User>;

    abstract findManyWithPagination({
        sortOptions,
        paginationOptions,
    }: {
        sortOptions?: Nullable<SortUserDto[]>;
        paginationOptions: PaginationOptions;
    }): Promise<User[]>;

    abstract findById(id: User["id"]): Promise<Nullable<User>>;
    abstract findByIds(ids: User["id"][]): Promise<User[]>;
    abstract findByEmail(email: User["email"]): Promise<Nullable<User>>;
    abstract findByProvider({
        provider,
    }: {
        provider: User["provider"];
    }): Promise<Nullable<User>>;

    abstract update(
        id: User["id"],
        payload: DeepPartial<User>,
    ): Promise<Nullable<User>>;

    abstract remove(id: User["id"]): Promise<void>;
}
