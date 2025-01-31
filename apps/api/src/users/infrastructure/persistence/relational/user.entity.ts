import { AuthProviders } from "@/auth/auth-providers";
import { EntityHelper } from "@/common/utils/entity-helper";
import { Nullable } from "@cloud/shared";
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
} from "typeorm";
import { StatusEntity } from "@/statuses/infrastructure/persistence/status.entity";

@Entity({
    name: "user",
})
export class UserEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    // NOTE: For "string | null" we need to use String type.
    // https://github.com/typeorm/typeorm/issues/2567
    @Column({ type: String, unique: true, nullable: true })
    email: Nullable<string>;

    @Column({ nullable: true })
    password?: string;

    @Column({ default: AuthProviders.Email })
    provider: string;

    @Index()
    @Column({ type: String, nullable: true })
    socialId?: Nullable<string>;

    @Index()
    @Column({ type: String, nullable: true })
    firstName: Nullable<string>;

    @Index()
    @Column({ type: String, nullable: true })
    lastName: Nullable<string>;

    @Column({ type: String, nullable: true })
    avatarUrl?: string;

    @ManyToOne(() => StatusEntity, {
        eager: true,
    })
    status?: Relation<StatusEntity>;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Nullable<Date>;
}
