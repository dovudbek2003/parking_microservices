import { User } from "src/modules/user/entities/user.entity";
import { ITariff } from "../interfaces/tariff.interface";

export class CreateUserTariffDto {
    userId: number;
    tariffId: number;
    startedAt: Date;
    foundUser: User | null;
    foundTariff: ITariff | null;
}
