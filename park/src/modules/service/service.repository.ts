import { InjectRepository } from "@nestjs/typeorm";
import { IServiceRepository } from "./interfaces/service.repository";
import { Service } from "./entities/service.entity";
import { Repository } from "typeorm";

export class ServiceRepository implements IServiceRepository {
    constructor(@InjectRepository(Service) private readonly repository: Repository<Service>) { }

    // CREATE
    async create(serviceEntity: Service): Promise<Service> {
        return this.repository.save(serviceEntity)
    }

    // READ
    async findAll(): Promise<Service[]> {
        return this.repository.find({ relations: ['park', 'tariff'] })
    }
    async findOne(id: number): Promise<Service> {
        return this.repository.findOneBy({ id })
    }

    // UPDATE
    async update(serviceEntity: Service): Promise<Service> {
        return this.repository.save(serviceEntity)
    }

    // DELETE
    async remove(id: number): Promise<Service> {
        const foundService = await this.findOne(id)
        await this.repository.delete(id)
        return foundService
    }
}