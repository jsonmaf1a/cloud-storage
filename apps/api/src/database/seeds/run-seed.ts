import { NestFactory } from "@nestjs/core";
import { SeedModule } from "./seed.module";
import { StatusSeedService } from "./status/status-seed.service";
import { UserSeedService } from "./user/user-seed.service";

const runSeed = async () => {
    const app = await NestFactory.create(SeedModule);

    await app.get(StatusSeedService).run();
    await app.get(UserSeedService).run();

    await app.close();
};

void runSeed();
