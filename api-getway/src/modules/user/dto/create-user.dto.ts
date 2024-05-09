import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "src/common/enums/role.enum";

export class CreateUserDto {
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
        enum: Role,
        default: Role.OWNER
    })
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    parkId: number;
}
