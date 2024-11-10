import { RelationalSessionPersistenceModule } from "./infrastructure/persistence/relational/persistence.module";
import { SessionService } from "./session.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [RelationalSessionPersistenceModule],
    providers: [SessionService],
    exports: [SessionService, RelationalSessionPersistenceModule],
})
export class SessionModule {}
