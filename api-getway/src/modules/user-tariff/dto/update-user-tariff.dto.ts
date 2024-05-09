import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';
import { ITariff } from 'src/modules/tariff/interfaces/user-tariff.interface';

export class UpdateUserTariffDto {
    id: number;

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    userId: number;

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    tariffId: number;

    @ApiProperty({
        type: Date
    })
    @IsNotEmpty()
    @IsDateString()
    startedAt: Date;

    foundUser: any;

    foundTariff: ITariff | null
}
