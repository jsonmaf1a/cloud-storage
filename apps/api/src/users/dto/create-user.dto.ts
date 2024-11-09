import { lowerCaseTransformer } from "@/common/transformers/lower-case.transformer";
import { Nullable } from "@/common/types/nullable";
import { Status } from "@/statuses/domain/status";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: "example@mail.com", type: String })
    @Transform(lowerCaseTransformer)
    @IsNotEmpty()
    @IsEmail()
    email: Nullable<string>;

    @ApiProperty()
    @MinLength(10)
    password?: string;

    provider?: string;

    @ApiProperty({ example: "John", type: String })
    @IsNotEmpty()
    firstName: Nullable<string>;

    @ApiProperty({ example: "Doe", type: String })
    @IsNotEmpty()
    lastName: Nullable<string>;

    @ApiPropertyOptional({ type: () => String })
    @IsOptional()
    avatarUrl?: Nullable<string>;

    @ApiProperty({
        type: () => Status,
    })
    status?: Status;
}
