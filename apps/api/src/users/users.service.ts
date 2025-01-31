import { AuthProviders } from "@/auth/auth-providers";
import { PaginationOptions } from "@/common/types/pagination-options";
import { StatusModel } from "@/statuses/domain/status";
import { Status } from "@/statuses/statuses";
import { Maybe } from "@cloud/shared";
import { HttpStatus, Injectable, UnprocessableEntityException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { User } from "./domain/user";
import { CreateUserDto } from "./dto/create-user.dto";
import { SortUserDto } from "./dto/query-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./infrastructure/persistence/user.repository";
import { Nullable } from "@cloud/shared";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UserRepository) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        let password: Maybe<string> = undefined;
        if (createUserDto.password) {
            const salt = await bcrypt.genSalt();
            password = await bcrypt.hash(createUserDto.password, salt);
        }

        let email: Nullable<string> = null;
        if (createUserDto.email) {
            const userObject = await this.usersRepository.findByEmail(
                createUserDto.email,
            );

            if (userObject) {
                throw new UnprocessableEntityException({
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        email: "emailAlreadyExists",
                    },
                });
            }

            email = createUserDto.email;
        }

        let status: Maybe<StatusModel> = undefined;
        if (createUserDto.status?.id) {
            const statusObject = Object.values(Status)
                .map(String)
                .includes(String(createUserDto.status.id));

            if (!statusObject) {
                throw new UnprocessableEntityException({
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        status: "statusNotExists",
                    },
                });
            }

            status = {
                id: createUserDto.status.id,
            };
        }

        return this.usersRepository.create({
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: email,
            password: password,
            avatarUrl: createUserDto.avatarUrl,
            status: status,
            provider: createUserDto.provider ?? AuthProviders.Email,
            socialId: createUserDto.socialId,
        });
    }

    findManyWithPagination({
        sortOptions,
        paginationOptions,
    }: {
        sortOptions?: Nullable<SortUserDto[]>;
        paginationOptions: PaginationOptions;
    }): Promise<User[]> {
        return this.usersRepository.findManyWithPagination({
            sortOptions,
            paginationOptions,
        });
    }

    findById(id: User["id"]): Promise<Nullable<User>> {
        return this.usersRepository.findById(id);
    }

    findByIds(ids: User["id"][]): Promise<User[]> {
        return this.usersRepository.findByIds(ids);
    }

    findByEmail(email: User["email"]): Promise<Nullable<User>> {
        return this.usersRepository.findByEmail(email);
    }

    findBySocialIdAndProvider({
        socialId,
        provider,
    }: {
        socialId: User["socialId"];
        provider: User["provider"];
    }): Promise<Nullable<User>> {
        return this.usersRepository.findBySocialIdAndProvider({
            socialId,
            provider,
        });
    }

    async update(id: User["id"], updateUserDto: UpdateUserDto): Promise<User | null> {
        let password: Maybe<string> = undefined;
        if (updateUserDto.password) {
            const userObject = await this.usersRepository.findById(id);

            if (userObject && userObject?.password !== updateUserDto.password) {
                const salt = await bcrypt.genSalt();
                password = await bcrypt.hash(updateUserDto.password, salt);
            }
        }

        let email: Maybe<Nullable<string>> = undefined;
        if (updateUserDto.email) {
            const userObject = await this.usersRepository.findByEmail(
                updateUserDto.email,
            );

            if (userObject && userObject.id !== id) {
                throw new UnprocessableEntityException({
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        email: "emailAlreadyExists",
                    },
                });
            }

            email = updateUserDto.email;
        } else if (updateUserDto.email === null) {
            email = null;
        }

        let status: Maybe<StatusModel> = undefined;
        if (updateUserDto.status?.id) {
            const statusObject = Object.values(Status)
                .map(String)
                .includes(String(updateUserDto.status.id));
            if (!statusObject) {
                throw new UnprocessableEntityException({
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        status: "statusNotExists",
                    },
                });
            }

            status = {
                id: updateUserDto.status.id,
            };
        }

        console.log(`Updated status: ${status}`);

        return this.usersRepository.update(id, {
            firstName: updateUserDto.firstName,
            lastName: updateUserDto.lastName,
            email,
            password,
            status,
            provider: updateUserDto.provider,
            avatarUrl: updateUserDto.avatarUrl,
            socialId: updateUserDto.socialId,
        });
    }

    async remove(id: User["id"]): Promise<void> {
        await this.usersRepository.remove(id);
    }
}
