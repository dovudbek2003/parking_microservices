import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsInt, IsNotEmpty } from "class-validator";

export class CreateServiceDto {
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
    userId: number;

    @ApiProperty({
        type: Date
    })
    @IsNotEmpty()
    // @IsDate()
    @IsDateString()
    startedAt: Date;

    @ApiProperty({
        type: Date
    })
    @IsNotEmpty()
    // @IsDate()
    @IsDateString()
    endedAt: Date;

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
    tariffId: number;
}
