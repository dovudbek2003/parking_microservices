import { Park } from "../entities/park.entity";

export interface IParkRepository {
    create(parkEntity: Park): Promise<Park>
    findAll(): Promise<Array<Park>>
    findOne(id: number): Promise<Park>
    findByName(name: string): Promise<Park>
    update(parkEntity: Park): Promise<Park>
    remove(id: number): Promise<Park>
}