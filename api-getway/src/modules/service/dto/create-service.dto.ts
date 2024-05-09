import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsDateString, IsInt, IsNotEmpty, IsOptional } from "class-validator";

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

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    price: number;

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    tariffId: number;
}
