import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { UsersRepository } from "./user.repository";
import { Module } from "@nestjs/common";
import { UserRepository } from "../user.repository";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [
        {
            provide: UserRepository,
            useClass: UsersRepository,
        },
    ],
    exports: [UserRepository],
})
export class PersistenceModule {}
