import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";

export class StatusModel {
    @Allow()
    @ApiProperty({
        type: Number,
    })
    id: number;

    @Allow()
    @ApiProperty({
        type: String,
        example: "active",
    })
    name?: string;
}
