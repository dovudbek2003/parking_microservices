import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class UpdateUserDto {
    id: number;
    
    @ApiProperty({
        type: String,
        example: '+998906931454'
    })
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({
        type: String,
        enum: Role
    })
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    parkId: number;
}
