import { InjectRepository } from "@nestjs/typeorm";
import { IParkRepository } from "./interfaces/park.repository";
import { Park } from "./entities/park.entity";
import { Repository, ReturnDocument } from "typeorm";

export class ParkRepository implements IParkRepository {
    constructor(@InjectRepository(Park) private repository: Repository<Park>) { }

    // CREATE
    async create(parkEntity: Park): Promise<Park> {
        return this.repository.save(parkEntity)
    }

    // READE
    async findAll(): Promise<Park[]> {
        return this.repository.find()
    }
    async findOne(id: number): Promise<Park> {
        return this.repository.findOneBy({ id })
    }
    async findByName(name: string): Promise<Park> {
        return this.repository.findOneBy({ name })
    }

    // UPDATE
    async update(parkEntity: Park): Promise<Park> {
        return this.repository.save(parkEntity)
    }

    // DELETE
    async remove(id: number): Promise<Park> {
        const foundPark = await this.findOne(id)
        await this.repository.delete(id)
        return foundPark
    }
}