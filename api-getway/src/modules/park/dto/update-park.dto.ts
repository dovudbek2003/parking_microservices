import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateParkDto {
    id: number;

    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    owner: number;

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    image: number;
}
