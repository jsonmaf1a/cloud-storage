import { StatusEntity } from "@/statuses/infrastructure/persistence/status.entity";
import { UserEntity } from "./user.entity";
import { User } from "@/users/domain/user";

export class UserMapper {
    private constructor() {}

    static toDomain(raw: UserEntity): User {
        const domainEntity = new User();

        domainEntity.id = raw.id;
        domainEntity.email = raw.email;
        domainEntity.password = raw.password;
        domainEntity.provider = raw.provider;
        domainEntity.socialId = raw.socialId;
        domainEntity.firstName = raw.firstName;
        domainEntity.lastName = raw.lastName;
        domainEntity.avatarUrl = raw.avatarUrl;
        domainEntity.status = raw.status;
        domainEntity.createdAt = new Date(raw.createdAt);
        domainEntity.updatedAt = new Date(raw.updatedAt);
        domainEntity.deletedAt = raw.deletedAt ? new Date(raw.deletedAt) : null;

        return domainEntity;
    }

    static toPersistence(domainEntity: User): UserEntity {
        let status: StatusEntity | undefined = undefined;

        if (domainEntity.status) {
            status = new StatusEntity();
            status.id = domainEntity.status.id;
        }

        const persistenceEntity = new UserEntity();

        persistenceEntity.id = domainEntity.id;
        persistenceEntity.email = domainEntity.email;
        persistenceEntity.password = domainEntity.password;
        persistenceEntity.provider = domainEntity.provider;
        persistenceEntity.socialId = domainEntity.socialId;
        persistenceEntity.firstName = domainEntity.firstName;
        persistenceEntity.lastName = domainEntity.lastName;
        persistenceEntity.avatarUrl = domainEntity.avatarUrl;
        persistenceEntity.status = status;
        persistenceEntity.createdAt = domainEntity.createdAt;
        persistenceEntity.updatedAt = domainEntity.updatedAt;
        persistenceEntity.deletedAt = domainEntity.deletedAt
            ? domainEntity.deletedAt
            : null;

        return persistenceEntity;
    }
}
