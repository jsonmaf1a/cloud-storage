import { AuthProviders } from "@/auth/auth-providers";
import { EntityHelper } from "@/common/utils/entity-helper";
import { Nullable } from "@/common/types/nullable";
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
import { StatusEntity } from "@/statuses/infrastructure/status.entity";

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
    firstName: Nullable<string>;

    @Index()
    @Column({ type: String, nullable: true })
    lastName: Nullable<string>;

    @Column({ type: String, nullable: true })
    avatarUrl?: Nullable<string>;

    @ManyToOne(() => StatusEntity, {
        eager: true,
    })
    status?: StatusEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
