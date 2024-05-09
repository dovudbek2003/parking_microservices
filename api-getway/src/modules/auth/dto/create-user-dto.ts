import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsString, NotEquals } from "class-validator";
import { Role } from "src/common/enums/role.enum";

export class CreateUserClientDto {
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
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    parkId: number;
}

export class CreateUserOwnerDto extends CreateUserClientDto {
    @ApiProperty({
        type: String,
        enum: Role,
        default: Role.OWNER
    })
    @IsNotEmpty()
    @IsEnum(Role)
    @NotEquals(Role.ADMIN)
    role: Role;
}