import { Injectable } from "@nestjs/common";

import { SessionRepository } from "./infrastructure/persistence/session.repository";
import { Session } from "./domain/session";
import { User } from "../users/domain/user";
import { Nullable } from "@cloud/shared";

@Injectable()
export class SessionService {
    constructor(private readonly sessionRepository: SessionRepository) {}

    findById(id: Session["id"]): Promise<Nullable<Session>> {
        return this.sessionRepository.findById(id);
    }

    create(
        data: Omit<Session, "id" | "createdAt" | "updatedAt" | "deletedAt">,
    ): Promise<Session> {
        return this.sessionRepository.create(data);
    }

    update(
        id: Session["id"],
        payload: Partial<
            Omit<Session, "id" | "createdAt" | "updatedAt" | "deletedAt">
        >,
    ): Promise<Session | null> {
        return this.sessionRepository.update(id, payload);
    }

    deleteById(id: Session["id"]): Promise<void> {
        return this.sessionRepository.deleteById(id);
    }

    deleteByUserId(conditions: { userId: User["id"] }): Promise<void> {
        return this.sessionRepository.deleteByUserId(conditions);
    }

    deleteByUserIdWithExclude(conditions: {
        userId: User["id"];
        excludeSessionId: Session["id"];
    }): Promise<void> {
        return this.sessionRepository.deleteByUserIdWithExclude(conditions);
    }
}
