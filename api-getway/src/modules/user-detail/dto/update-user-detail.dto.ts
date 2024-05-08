import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

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

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    avatar: number;

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    userId: number;
}
