import { Park } from "src/modules/park/entities/park.entity";
import { Tariff } from "src/modules/tariff/entities/tariff.entity";
import { CreateServiceDto } from "../dto/create-service.dto";
import { ResponseData } from "src/lib/response-data";
import { Service } from "../entities/service.entity";
import { UpdateServiceDto } from "../dto/update-service.dto";

export interface IServiceService {
    create(createServiceDto: CreateServiceDto, foundPark: Park, foundTariff: Tariff): Promise<ResponseData<Service>>
    findAll(): Promise<ResponseData<Array<Service>>>
    findOne(id: number): Promise<ResponseData<Service>>
    update(id: number, updateServiceDto: UpdateServiceDto, foundPark: Park, foundTariff: Tariff): Promise<ResponseData<Service>>
    remove(id: number): Promise<ResponseData<Service>>
}