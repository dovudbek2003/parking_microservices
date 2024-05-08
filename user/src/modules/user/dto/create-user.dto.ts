import { Role } from "src/common/enums/role.enum";

export class CreateUserDto {
    phone: string;
    password: string;
    role: Role;
    parkId: number;
}
