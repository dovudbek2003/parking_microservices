import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty } from "class-validator";
import { ITariff } from "src/modules/tariff/interfaces/user-tariff.interface";

export class CreateUserTariffDto {
    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    userId: number;

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsInt()
    tariffId: number;

    @ApiProperty({
        type: Date
    })
    @IsNotEmpty()
    @IsDateString()
    startedAt: Date;

    foundUser: any | null;

    foundTariff: ITariff | null
}
