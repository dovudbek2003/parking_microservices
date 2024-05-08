import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { IUserRepository } from "./interfaces/user.repository";
import { Repository } from "typeorm";

export class UserRepository implements IUserRepository {
    constructor(@InjectRepository(User) private readonly repository: Repository<User>) { }

    // CREATE
    async create(userEntity: User): Promise<User> {
        return this.repository.save(userEntity)
    }

    // READ
    async findAll(): Promise<User[]> {
        return this.repository.find()
    }
    async findOne(id: number): Promise<User> {
        return this.repository.findOneBy({ id })
    }
    async findByPhone(phone: string): Promise<User> {
        return this.repository.findOneBy({ phone })
    }

    // UPDATE
    async update(userEntity: User): Promise<User> {
        return this.repository.save(userEntity)
    }

    // DELETE
    async remove(id: number): Promise<User> {
        const foundUser = await this.findOne(id)
        await this.repository.delete(id)
        return foundUser
    }
}