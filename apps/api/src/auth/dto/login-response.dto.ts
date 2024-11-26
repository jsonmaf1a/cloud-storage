import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/domain/user";

export class LoginResponseDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    refreshToken: string;

    @ApiProperty()
    tokenExpiration: number;

    @ApiProperty({
        type: () => User,
    })
    user: User;
}
