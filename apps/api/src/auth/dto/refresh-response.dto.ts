import { ApiProperty } from "@nestjs/swagger";

export class RefreshResponseDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    refreshToken: string;

    @ApiProperty()
    tokenExpiration: number;
}
