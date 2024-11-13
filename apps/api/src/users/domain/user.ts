import { ExposeGroup } from "@/common/enums/expose-group";
import { Maybe, Nullable } from "@cloud/shared";
import { StatusModel } from "@/statuses/domain/status";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export class User {
    @ApiProperty({
        type: Number,
    })
    id: number;

    @ApiProperty({
        type: String,
        example: "example@mail.com",
    })
    @Expose({ groups: [ExposeGroup.Self] })
    email: Nullable<string>;

    @Exclude({ toPlainOnly: true })
    password?: string;

    @ApiProperty({
        type: String,
        example: "email",
    })
    @Expose({ groups: [ExposeGroup.Self] })
    provider: string;

    @ApiProperty({
        type: String,
        example: "1234567890",
    })
    @Expose({ groups: [ExposeGroup.Self] })
    socialId?: Nullable<string>;

    @ApiProperty({
        type: String,
        example: "John",
    })
    firstName: Nullable<string>;

    @ApiProperty({
        type: String,
        example: "Doe",
    })
    lastName: Nullable<string>;

    @ApiPropertyOptional({
        type: () => String,
    })
    avatarUrl?: string;

    @ApiProperty({
        type: () => StatusModel,
    })
    status?: Maybe<StatusModel>;

    // @ApiProperty()
    // files: FileModel[];

    // @ApiProperty()
    // folders: Folder[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    deletedAt: Nullable<Date>;
}
