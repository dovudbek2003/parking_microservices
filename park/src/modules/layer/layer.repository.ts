import { InjectRepository } from "@nestjs/typeorm";
import { ILayerRepository } from "./interfaces/layer.repository";
import { Layer } from "./entities/layer.entity";
import { Repository } from "typeorm";

export class LayerRepository implements ILayerRepository {
    constructor(@InjectRepository(Layer) private readonly repository: Repository<Layer>) { }

    // CREATE
    async create(layerEntity: Layer): Promise<Layer> {
        return this.repository.save(layerEntity)
    }

    // READE
    async findAll(): Promise<Layer[]> {
        return this.repository.find({ relations: ['park'] })
    }
    async findOne(id: number): Promise<Layer> {
        return this.repository.findOneBy({ id })
    }

    // UPDATE
    async update(layerEntity: Layer): Promise<Layer> {
        return this.repository.save(layerEntity)
    }

    // DELETE
    async remove(id: number): Promise<Layer> {
        const foundLayer = await this.findOne(id)
        await this.repository.delete(id)
        return foundLayer
    }
}