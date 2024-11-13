import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { Transform, Type } from "class-transformer";
import { lowerCaseTransformer } from "@/common/transformers/lower-case.transformer";
import { IsEmail, IsOptional, MinLength } from "class-validator";
import { Nullable } from "@cloud/shared";
import { StatusDto } from "@/statuses/dto/status.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiPropertyOptional({ example: "test1@example.com", type: String })
    @Transform(lowerCaseTransformer)
    @IsOptional()
    @IsEmail()
    email?: Nullable<string>;

    @ApiPropertyOptional()
    @IsOptional()
    @MinLength(10)
    password?: string;

    provider?: string;

    socialId?: Nullable<string>;

    @ApiPropertyOptional({ example: "John", type: String })
    @IsOptional()
    firstName?: Nullable<string>;

    @ApiPropertyOptional({ example: "Doe", type: String })
    @IsOptional()
    lastName?: Nullable<string>;

    @ApiPropertyOptional({ type: String })
    @IsOptional()
    avatarUrl?: string;

    @ApiPropertyOptional({ type: () => StatusDto })
    @IsOptional()
    @Type(() => StatusDto)
    status?: StatusDto;
}
