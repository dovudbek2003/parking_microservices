import { ResponseData } from "src/lib/response-data";
import { CreateLayerDto } from "../dto/create-layer.dto";
import { Layer } from "../entities/layer.entity";
import { UpdateLayerDto } from "../dto/update-layer.dto";
import { Park } from "src/modules/park/entities/park.entity";

export interface ILayerService {
    create(createLayerDto: CreateLayerDto, foundPark: Park): Promise<ResponseData<Layer>>
    findAll(): Promise<ResponseData<Array<Layer>>>
    findOne(id: number): Promise<ResponseData<Layer>>
    update(id: number, updateLayerDto: UpdateLayerDto, foundPark: Park): Promise<ResponseData<Layer>>
    remove(id: number): Promise<ResponseData<Layer>>
}