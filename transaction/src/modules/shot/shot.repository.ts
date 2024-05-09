import { InjectRepository } from "@nestjs/typeorm";
import { IShotRepository } from "./interfaces/shot.repository";
import { Shot } from "./entities/shot.entity";
import { Repository } from "typeorm";

export class ShotRepository implements IShotRepository {
    constructor(@InjectRepository(Shot) private readonly repository: Repository<Shot>) { }

    // CREATE
    async create(shotEntity: Shot): Promise<Shot> {
        return this.repository.save(shotEntity)
    }

    // READ
    async findAll(): Promise<Shot[]> {
        return this.repository.find()
    }
    async findOne(id: number): Promise<Shot> {
        return this.repository.findOneBy({ id })
    }
    async findByUserId(userId: number): Promise<Shot> {
        return this.repository.findOneBy({ userId })
    }

    // UPDATE
    async update(shotEntity: Shot): Promise<Shot> {
        return this.repository.save(shotEntity)
    }

    // DELETE
    async remove(id: number): Promise<Shot> {
        const foundShot = await this.findOne(id)
        await this.repository.delete(id)
        return foundShot
    }
}