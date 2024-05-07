import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateParkDto {
    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    owner: number;

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    image: number;
}
