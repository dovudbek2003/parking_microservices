import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';
import { IsDate, IsDateString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateServiceDto {
    id: number;

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
    @IsDateString()
    startedAt: Date;

    @ApiProperty({
        type: Date
    })
    @IsNotEmpty()
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
