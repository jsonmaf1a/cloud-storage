import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserDto {
    @ApiProperty({
        type: Number,
        example: "userId",
    })
    @IsNotEmpty()
    id: number;
}
