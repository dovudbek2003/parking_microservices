import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateTariffDto {
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
    parkId: number;

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    price: number;

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    time: number;
}
