import { SetMetadata } from "@nestjs/common";
import { Role } from "src/common/enums/role.enum";
import { ROLES_KEY } from "../const/servers";

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)