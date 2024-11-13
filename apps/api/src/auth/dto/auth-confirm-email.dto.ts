import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

// import { AuthConfirmEmailDtoSchema } from "@cloud/shared";

export class AuthConfirmEmailDto {
    @ApiProperty()
    @IsNotEmpty()
    hash: string;
}

//
// export class AuthConfirmEmailDto extends createZodDto(
//     AuthConfirmEmailDtoSchema,
// ) {}
