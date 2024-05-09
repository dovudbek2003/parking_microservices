import { ResponseData } from "src/lib/response-data"
import { UpdateShotDto } from "../dto/update-shot.dto"
import { Shot } from "../entities/shot.entity"
import { CreateShotDto } from "../dto/create-shot.dto"

export interface IShotService {
    create(createShotDto: CreateShotDto): Promise<ResponseData<Shot>>
    findAll(): Promise<ResponseData<Array<Shot>>>
    findOne(id: number): Promise<ResponseData<Shot>>
    _findByUserId(userId: number): Promise<Shot>
    update(id: number, updateShotDto: UpdateShotDto): Promise<ResponseData<Shot>>
    remove(id: number): Promise<ResponseData<Shot>>
}