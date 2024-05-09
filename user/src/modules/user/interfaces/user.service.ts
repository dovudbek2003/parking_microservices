import { ResponseData } from "src/lib/response-data";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";

export interface IUserResponseData {
    user: User;
    token: string;
}

export interface IUserService {
    create(createUserDto: CreateUserDto): Promise<ResponseData<IUserResponseData>>
    findAll(): Promise<ResponseData<Array<User>>>
    findOne(id: number): Promise<ResponseData<User>>
    findByPhone(phone: string): Promise<ResponseData<User>>
    update(id: number, createUserDto: CreateUserDto): Promise<ResponseData<User>>
    remove(id: number): Promise<ResponseData<User>>
}