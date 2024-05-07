import { Park } from "src/modules/park/entities/park.entity";
import { CreateTariffDto } from "../dto/create-tariff.dto";
import { ResponseData } from "src/lib/response-data";
import { Tariff } from "../entities/tariff.entity";

export interface ITariffService{
    create(createTariffDto: CreateTariffDto, foundPark: Park): Promise<ResponseData<Tariff>>
    findAll(): Promise<ResponseData<Array<Tariff>>>
    findOne(id: number): Promise<ResponseData<Tariff>>
    update(id: number, createTariffDto: CreateTariffDto, foundPark: Park): Promise<ResponseData<Tariff>>
    remove(id: number): Promise<ResponseData<Tariff>>
} 