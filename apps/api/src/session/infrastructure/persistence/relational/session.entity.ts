import { EntityHelper } from "@/common/utils/entity-helper";
import { UserEntity } from "@/users/infrastructure/persistence/relational/user.entity";
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({
    name: "session",
})
export class SessionEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, {
        eager: true,
    })
    @Index()
    user: UserEntity;

    @Column()
    hash: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
