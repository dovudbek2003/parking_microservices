import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTariffDto } from './create-tariff.dto';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTariffDto{
    id: number;
    @ApiPropertyOptional({
        type: String
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    parkId: number;

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
    time: number;
}
