import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { PersistenceModule } from "./infrastructure/persistence/relational/persistence.module";

@Module({
    imports: [
        PersistenceModule,
        // FilesModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService, PersistenceModule],
})
export class UsersModule {}
