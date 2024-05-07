import { ResponseData } from "src/lib/response-data";
import { CreateParkDto } from "../dto/create-park.dto";
import { Park } from "../entities/park.entity";
import { UpdateParkDto } from "../dto/update-park.dto";

export interface IParkService {
    create(createParkDto: CreateParkDto): Promise<ResponseData<Park>>
    findAll(): Promise<ResponseData<Array<Park>>>
    findOne(id: number): Promise<ResponseData<Park>>
    _findByName(name: string): Promise<Park | null>
    update(id: number, updateParkDto: UpdateParkDto): Promise<ResponseData<Park>>
    remove(id: number): Promise<ResponseData<Park>>
}