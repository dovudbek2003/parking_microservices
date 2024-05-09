import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDetailDto {
    id: number;

    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    lastname: string;

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    avatar: number;

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    userId: number;
}
