import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Module } from "@nestjs/common";
import { UserRepository } from "../user.repository";
import { UsersRelationalRepository } from "./user.repository";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [
        {
            provide: UserRepository,
            useClass: UsersRelationalRepository,
        },
    ],
    exports: [UserRepository],
})
export class RelationalUserPersistenceModule {}
