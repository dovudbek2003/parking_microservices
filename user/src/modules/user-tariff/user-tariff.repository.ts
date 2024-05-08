import { InjectRepository } from "@nestjs/typeorm";
import { IUserTariffRepository } from "./interfaces/user-tariff.repository";
import { UserTariff } from "./entities/user-tariff.entity";
import { Repository } from "typeorm";

export class UserTariffRepository implements IUserTariffRepository {
    constructor(@InjectRepository(UserTariff) private readonly repository: Repository<UserTariff>) { }

    // CREATE
    async create(userTariffEntity: UserTariff): Promise<UserTariff> {
        return this.repository.save(userTariffEntity)
    }

    // READ
    async findAll(): Promise<UserTariff[]> {
        return this.repository.find({ relations: ['user'] })
    }
    async findOne(id: number): Promise<UserTariff> {
        return this.repository.findOneBy({ id })
    }

    // UPDATE
    async update(userTariffEntity: UserTariff): Promise<UserTariff> {
        return this.repository.save(userTariffEntity)
    }

    // DELETE
    async remove(id: number): Promise<UserTariff> {
        const foundUserTariff = await this.findOne(id)
        await this.repository.delete(id)
        return foundUserTariff
    }
}