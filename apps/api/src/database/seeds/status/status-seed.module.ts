import { StatusEntity } from "@/statuses/infrastructure/persistence/status.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatusSeedService } from "./status-seed.service";

@Module({
    imports: [TypeOrmModule.forFeature([StatusEntity])],
    providers: [StatusSeedService],
    exports: [StatusSeedService],
})
export class StatusSeedModule {}
