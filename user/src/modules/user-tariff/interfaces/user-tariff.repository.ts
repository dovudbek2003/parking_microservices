import { UserTariff } from "../entities/user-tariff.entity"

export interface IUserTariffRepository {
    create(userTariffEntity: UserTariff): Promise<UserTariff>
    findAll(): Promise<Array<UserTariff>>
    findOne(id: number): Promise<UserTariff>
    update(userTariffEntity: UserTariff): Promise<UserTariff>
    remove(id: number): Promise<UserTariff>
}