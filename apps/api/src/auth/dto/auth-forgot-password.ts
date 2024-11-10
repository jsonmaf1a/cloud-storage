import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
import { Transform } from "class-transformer";
import { lowerCaseTransformer } from "@/common/transformers/lower-case.transformer";

export class AuthForgotPasswordDto {
    @ApiProperty({ example: "example@mail.com", type: String })
    @Transform(lowerCaseTransformer)
    @IsEmail()
    email: string;
}
