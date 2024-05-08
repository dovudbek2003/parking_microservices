import { UserDetail } from "./entities/user-detail.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IUserDetailRepository } from "./interfaces/user-detail.repository";

export class UserDetailRepository implements IUserDetailRepository {
    constructor(@InjectRepository(UserDetail) private readonly repository: Repository<UserDetail>) { }

    // CREATE
    async create(userDetailEntity: UserDetail): Promise<UserDetail> {
        return this.repository.save(userDetailEntity)
    }

    // READ
    async findAll(): Promise<UserDetail[]> {
        return this.repository.find()
    }
    async findOne(id: number): Promise<UserDetail> {
        return this.repository.findOneBy({ id })
    }

    // UPDATE
    async update(userDetailEntity: UserDetail): Promise<UserDetail> {
        return this.repository.save(userDetailEntity)
    }

    // DELETE
    async remove(id: number): Promise<UserDetail> {
        const foundUserDetail = await this.findOne(id)
        await this.repository.delete(id)
        return foundUserDetail
    }
}