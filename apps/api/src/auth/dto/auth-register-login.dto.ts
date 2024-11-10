import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Transform } from "class-transformer";
import { lowerCaseTransformer } from "@/common/transformers/lower-case.transformer";

export class AuthRegisterLoginDto {
    @ApiProperty({ example: "example@mail.com", type: String })
    @Transform(lowerCaseTransformer)
    @IsEmail()
    email: string;

    @ApiProperty()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: "John" })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ example: "Doe" })
    @IsNotEmpty()
    lastName: string;
}
