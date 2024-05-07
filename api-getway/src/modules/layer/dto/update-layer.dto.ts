import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateLayerDto {
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
    floor: number;

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    parkId: number;
}