import { ApiPropertyOptional } from "@nestjs/swagger";
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsUrl,
    MinLength,
} from "class-validator";
import { Transform } from "class-transformer";
import { Nullable } from "@/common/types/nullable";
import { lowerCaseTransformer } from "@/common/transformers/lower-case.transformer";

export class AuthUpdateDto {
    @ApiPropertyOptional({ type: String })
    @IsOptional()
    @IsUrl()
    avatarUrl?: string;

    @ApiPropertyOptional({ example: "John" })
    @IsOptional()
    @IsNotEmpty({ message: "mustBeNotEmpty" })
    firstName?: string;

    @ApiPropertyOptional({ example: "Doe" })
    @IsOptional()
    @IsNotEmpty({ message: "mustBeNotEmpty" })
    lastName?: string;

    @ApiPropertyOptional({ example: "example@mail.com" })
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    @Transform(lowerCaseTransformer)
    email?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    @MinLength(10)
    password?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty({ message: "mustBeNotEmpty" })
    oldPassword?: string;
}
