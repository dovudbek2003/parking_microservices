import { Observable } from "rxjs";
import { Role } from "src/common/enums/role.enum";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

export interface IUser {
    id: number;
    phone: string;
    password: string;
    role: Role;
    parkId: number;
    createdAt: Date;
    lastUpdatedAt: Date;
}

export interface IUserResponseData {
    message: string;
    statusCode: number;
    data: IUser
}

export interface IUserService {
    create(createUserDto: CreateUserDto): Observable<IUserResponseData>
    findAll({ }): Observable<IUserResponseData>
    findOne({ id }: { id: number }): Observable<IUserResponseData>
    update(updateUserDto: UpdateUserDto): Observable<IUserResponseData>
    remove({ id }: { id: number }): Observable<IUserResponseData>
}