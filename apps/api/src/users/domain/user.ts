import { ExposeGroup } from "@/common/enums/expose-group";
import { Nullable } from "@/common/types/nullable";
import { Status } from "@/statuses/domain/status";
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
    avatarUrl?: Nullable<string>;

    @ApiProperty({
        type: () => Status,
    })
    status?: Status;

    // @ApiProperty()
    // files: FileModel[];

    // @ApiProperty()
    // folders: Folder[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    deletedAt: Date;
}
