import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, In, Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { Nullable } from "@cloud/shared";
import { User } from "@/users/domain/user";
import { PaginationOptions } from "@/common/types/pagination-options";
import { SortUserDto } from "@/users/dto/query-user.dto";
import { UserMapper } from "./user.mapper";
import { UserRepository } from "../user.repository";

@Injectable()
export class UsersRelationalRepository implements UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) {}

    async create(data: User): Promise<User> {
        const persistenceModel = UserMapper.toPersistence(data);

        const newEntity = await this.usersRepository.save(
            this.usersRepository.create(persistenceModel),
        );

        return UserMapper.toDomain(newEntity);
    }

    async findManyWithPagination({
        sortOptions,
        paginationOptions,
    }: {
        sortOptions?: Nullable<SortUserDto[]>;
        paginationOptions: PaginationOptions;
    }): Promise<User[]> {
        const where: FindOptionsWhere<UserEntity> = {};

        const entities = await this.usersRepository.find({
            skip: (paginationOptions.page - 1) * paginationOptions.limit,
            take: paginationOptions.limit,
            where: where,
            order: sortOptions?.reduce(
                (accumulator, sort) => ({
                    // biome-ignore lint/performance/noAccumulatingSpread:
                    ...accumulator,
                    [sort.orderBy]: sort.order,
                }),
                {},
            ),
        });

        return entities.map((user) => UserMapper.toDomain(user));
    }

    async findById(id: User["id"]): Promise<Nullable<User>> {
        const entity = await this.usersRepository.findOne({
            where: { id: Number(id) },
        });

        return entity ? UserMapper.toDomain(entity) : null;
    }

    async findByIds(ids: User["id"][]): Promise<User[]> {
        const entities = await this.usersRepository.find({
            where: { id: In(ids) },
        });

        return entities.map((user) => UserMapper.toDomain(user));
    }

    async findByEmail(email: User["email"]): Promise<Nullable<User>> {
        if (!email) return null;

        const entity = await this.usersRepository.findOne({
            where: { email },
        });

        return entity ? UserMapper.toDomain(entity) : null;
    }

    async findBySocialIdAndProvider({
        socialId,
        provider,
    }: {
        socialId: User["socialId"];
        provider: User["provider"];
    }): Promise<Nullable<User>> {
        if (!socialId || !provider) return null;

        const entity = await this.usersRepository.findOne({
            where: { socialId, provider },
        });

        return entity ? UserMapper.toDomain(entity) : null;
    }

    async update(id: User["id"], payload: Partial<User>): Promise<User> {
        const entity = await this.usersRepository.findOne({
            where: { id: Number(id) },
        });

        if (!entity) {
            throw new Error("User not found");
        }

        const updatedEntity = await this.usersRepository.save(
            this.usersRepository.create(
                UserMapper.toPersistence({
                    ...UserMapper.toDomain(entity),
                    ...payload,
                }),
            ),
        );

        return UserMapper.toDomain(updatedEntity);
    }

    async remove(id: User["id"]): Promise<void> {
        await this.usersRepository.softDelete(id);
    }
}
