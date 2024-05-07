import { Tariff } from "../entities/tariff.entity"

export interface ITariffRepository{
    create(tariffEntity: Tariff): Promise<Tariff>
    findAll(): Promise<Array<Tariff>>
    findOne(id: number): Promise<Tariff>
    update(tariffEntity: Tariff): Promise<Tariff>
    remove(id: number): Promise<Tariff>

}