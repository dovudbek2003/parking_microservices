import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
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
    password: string
}
