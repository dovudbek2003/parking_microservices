import { ITariff } from "../interfaces/tariff.interface";

export class CreateUserTariffDto {
    userId: number;
    tariffId: number;
    startedAt: Date;
    foundTariff: ITariff | null;
}
