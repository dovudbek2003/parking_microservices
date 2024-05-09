import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateParkDto {
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
