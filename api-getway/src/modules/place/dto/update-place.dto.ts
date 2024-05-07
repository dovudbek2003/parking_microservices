import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePlaceDto } from './create-place.dto';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePlaceDto {
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
    layerId: number;

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    price: number;
}
