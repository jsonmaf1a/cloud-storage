import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserEntity } from "@/users/infrastructure/persistence/relational/user.entity";
import { Status } from "@/statuses/statuses";

@Injectable()
export class UserSeedService {
    constructor(
        @InjectRepository(UserEntity)
        private repository: Repository<UserEntity>,
    ) {}

    async run() {
        const countUser = await this.repository.count();

        if (!countUser) {
            const salt = await bcrypt.genSalt();
            const password = await bcrypt.hash("rootpassword", salt);

            await this.repository.save(
                this.repository.create({
                    firstName: "Root",
                    lastName: "Bruh",
                    email: "bruh@root.com",
                    password,
                    status: {
                        id: Status.Active,
                        name: "Active",
                    },
                }),
            );
        }
    }
}
