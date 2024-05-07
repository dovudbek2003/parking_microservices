import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTariffDto } from './create-tariff.dto';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTariffDto{
    id: number;
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
