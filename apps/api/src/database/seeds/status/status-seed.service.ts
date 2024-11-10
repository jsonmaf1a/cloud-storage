import { StatusEntity } from "@/statuses/infrastructure/persistence/status.entity";
import { Status } from "@/statuses/statuses";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class StatusSeedService {
    constructor(
        @InjectRepository(StatusEntity)
        private repository: Repository<StatusEntity>,
    ) {}

    async run() {
        const count = await this.repository.count();

        if (!count) {
            await this.repository.save([
                this.repository.create({
                    id: Status.Active,
                    name: "Active",
                }),
                this.repository.create({
                    id: Status.Inactive,
                    name: "Inactive",
                }),
                this.repository.create({
                    id: Status.Pending,
                    name: "Pending",
                }),
                this.repository.create({
                    id: Status.Expired,
                    name: "Expired",
                }),
                this.repository.create({
                    id: Status.Blocked,
                    name: "Blocked",
                }),
            ]);
        }
    }
}
