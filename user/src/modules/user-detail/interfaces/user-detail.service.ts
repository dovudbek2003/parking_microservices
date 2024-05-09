import { ResponseData } from "src/lib/response-data";
import { CreateUserDetailDto } from "../dto/create-user-detail.dto";
import { UserDetail } from "../entities/user-detail.entity";
import { UpdateUserDetailDto } from "../dto/update-user-detail.dto";

export interface IUserDetailService {
    create(createUserDetailDto: CreateUserDetailDto): Promise<ResponseData<UserDetail>>
    findAll(): Promise<ResponseData<Array<UserDetail>>>
    findOne(id: number): Promise<ResponseData<UserDetail>>
    update(id: number, updateUserDetailDto: UpdateUserDetailDto): Promise<ResponseData<UserDetail>>
    remove(id: number): Promise<ResponseData<UserDetail>>
}