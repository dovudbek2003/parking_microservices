import { FileEntity } from "../entities/file.entity";

export interface IFileRepository {
    getFiles(): Promise<FileEntity[]>;
    getFile(id: number): Promise<FileEntity>;
    createFile(entity: FileEntity): Promise<FileEntity>;
    deleteFile(entity: FileEntity): Promise<FileEntity>;
}