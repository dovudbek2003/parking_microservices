import { Repository } from "typeorm";
import { Tariff } from "./entities/tariff.entity";
import { ITariffRepository } from "./interfaces/tariff.repository";
import { InjectRepository } from "@nestjs/typeorm";

export class TariffRepository implements ITariffRepository {
    constructor(@InjectRepository(Tariff) private readonly repository: Repository<Tariff>) { }

    // CREATE
    async create(tariffEntity: Tariff): Promise<Tariff> {
        return this.repository.save(tariffEntity)
    }

    // READ
    async findAll(): Promise<Tariff[]> {
        return this.repository.find({ relations: ['park'] })
    }
    async findOne(id: number): Promise<Tariff> {
        return this.repository.findOneBy({ id })
    }

    // UPDATE
    async update(tariffEntity: Tariff): Promise<Tariff> {
        return this.repository.save(tariffEntity)
    }

    // DELETE
    async remove(id: number): Promise<Tariff> {
        const foundTariff = await this.findOne(id)
        await this.repository.delete(id)
        return foundTariff
    }
}