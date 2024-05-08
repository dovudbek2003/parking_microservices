import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDetailDto {
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
