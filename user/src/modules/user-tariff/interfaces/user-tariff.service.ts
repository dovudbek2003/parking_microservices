import { ResponseData } from "src/lib/response-data"
import { UpdateUserTariffDto } from "../dto/update-user-tariff.dto"
import { UserTariff } from "../entities/user-tariff.entity"
import { CreateUserTariffDto } from "../dto/create-user-tariff.dto"
import { User } from "src/modules/user/entities/user.entity"
import { ITariff } from "./tariff.interface"

export interface IUserTariffService {
    create(createUserTariffDto: CreateUserTariffDto, foundUser: User, foundTariff: ITariff | null): Promise<ResponseData<UserTariff>>
    findAll(): Promise<ResponseData<Array<UserTariff>>>
    findOne(id: number): Promise<ResponseData<UserTariff>>
    update(id: number, updateUserTariffdto: UpdateUserTariffDto, foundUser: User, foundTariff: ITariff | null): Promise<ResponseData<UserTariff>>
    remove(id: number): Promise<ResponseData<UserTariff>>
}