import { Place } from "../entities/place.entity";

export interface IPlaceRepository {
    create(placeEntity: Place): Promise<Place>
    findAll(): Promise<Array<Place>>
    findOne(id: number): Promise<Place>
    update(placeEntity: Place): Promise<Place>
    remove(id: number): Promise<Place>
}