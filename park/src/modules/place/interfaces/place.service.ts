import { ResponseData } from "src/lib/response-data";
import { CreatePlaceDto } from "../dto/create-place.dto";
import { Place } from "../entities/place.entity";

export interface IPlaceService {
    create(createPlaceDto: CreatePlaceDto):Promise<ResponseData<Place>>
    findAll():Promise<ResponseData<Array<Place>>>
    findOne(id: number):Promise<ResponseData<Place>>
    update(id: number, updatePlaceDto: CreatePlaceDto):Promise<ResponseData<Place>>
    remove(id: number):Promise<ResponseData<Place>>
}