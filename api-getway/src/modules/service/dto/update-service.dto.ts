import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';
import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

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
    @IsDate()
    startedAt: Date;

    @ApiProperty({
        type: Date
    })
    @IsNotEmpty()
    @IsDate()
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
