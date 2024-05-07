import { Service } from "../entities/service.entity"

export interface IServiceRepository {
    create(serviceEntity: Service): Promise<Service>
    findAll(): Promise<Array<Service>>
    findOne(id: number): Promise<Service>
    update(serviceEntity: Service): Promise<Service>
    remove(id: number): Promise<Service>
}