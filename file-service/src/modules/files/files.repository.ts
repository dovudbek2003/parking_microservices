import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "./entities/file.entity";
import { Repository } from "typeorm";
import { IFileRepository } from "./interfaces/file.repo.interface";

export class FileRepository implements IFileRepository {
    constructor(@InjectRepository(FileEntity) private repository: Repository<FileEntity>) {}
    async createFile(entity: FileEntity): Promise<FileEntity> {
        return this.repository.save(entity);
    }
    async getFiles(): Promise<FileEntity[]> {
        return this.repository.find();
    }
    async getFile(id: number): Promise<FileEntity> {
        return this.repository.findOneBy({id});
    }
    async deleteFile(entity: FileEntity): Promise<FileEntity> {
        return this.repository.remove(entity);
    }
}