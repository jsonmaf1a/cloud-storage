import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionRepository } from "../session.repository";
import { SessionEntity } from "./session.entity";
import { SessionRelationalRepository } from "./session.repository";

@Module({
    imports: [TypeOrmModule.forFeature([SessionEntity])],
    providers: [
        {
            provide: SessionRepository,
            useClass: SessionRelationalRepository,
        },
    ],
    exports: [SessionRepository],
})
export class RelationalSessionPersistenceModule {}
