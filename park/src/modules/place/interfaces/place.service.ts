import { ResponseData } from "src/lib/response-data";
import { CreatePlaceDto } from "../dto/create-place.dto";
import { Place } from "../entities/place.entity";
import { Layer } from "src/modules/layer/entities/layer.entity";

export interface IPlaceService {
    create(createPlaceDto: CreatePlaceDto, foundLayer:Layer):Promise<ResponseData<Place>>
    findAll():Promise<ResponseData<Array<Place>>>
    findOne(id: number):Promise<ResponseData<Place>>
    update(id: number, updatePlaceDto: CreatePlaceDto, foundLayer:Layer):Promise<ResponseData<Place>>
    remove(id: number):Promise<ResponseData<Place>>
}