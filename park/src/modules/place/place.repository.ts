import { InjectRepository } from "@nestjs/typeorm";
import { IPlaceRepository } from "./interfaces/place.repository";
import { Place } from "./entities/place.entity";
import { Repository } from "typeorm";

export class PlaceRepository implements IPlaceRepository {
    constructor(@InjectRepository(Place) private readonly repository: Repository<Place>) { }

    // CREATE
    async create(placeEntity: Place): Promise<Place> {
        return await this.repository.save(placeEntity)
    }

    // READ
    async findAll(): Promise<Place[]> {
        return await this.repository.find()
    }
    async findOne(id: number): Promise<Place> {
        return await this.repository.findOneBy({ id })
    }

    // UPDATE
    async update(placeEntity: Place): Promise<Place> {
        return await this.repository.save(placeEntity)
    }

    // DELETE
    async remove(id: number): Promise<Place> {
        const foundPlace = await this.findOne(id)
        await this.repository.delete(id)
        return foundPlace;
    }
}