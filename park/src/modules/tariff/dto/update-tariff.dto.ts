import { PartialType } from '@nestjs/mapped-types';
import { CreateTariffDto } from './create-tariff.dto';

export class UpdateTariffDto extends CreateTariffDto {
    id: number;
}
