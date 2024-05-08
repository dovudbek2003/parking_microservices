import { UserDetail } from "../entities/user-detail.entity"

export interface IUserDetailRepository{
    create(userDetailEntity: UserDetail): Promise<UserDetail>
    findAll(): Promise<Array<UserDetail>>
    findOne(id: number): Promise<UserDetail>
    update(userDetailEntity: UserDetail): Promise<UserDetail>
    remove(id: number): Promise<UserDetail>
}