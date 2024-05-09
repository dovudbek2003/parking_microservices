import { Shot } from "../entities/shot.entity"

export interface IShotRepository {
    create(shotEntity: Shot): Promise<Shot>
    findAll(): Promise<Array<Shot>>
    findOne(id: number): Promise<Shot>
    findByUserId(userId: number): Promise<Shot>
    update(shotEntity: Shot): Promise<Shot>
    remove(id: number): Promise<Shot>
}