import { User } from "../entities/user.entity"

export interface IUserRepository {
    create(userEntity: User): Promise<User>
    findAll(): Promise<Array<User>>
    findOne(id: number): Promise<User>
    findByPhone(phone: string): Promise<User>
    update(userEntity: User): Promise<User>
    remove(id: number): Promise<User>
}