import { RpcException } from "@nestjs/microservices";

export class FileBadRequest extends RpcException {
    constructor(message: string) {
        super(`File type expected image but ${message}`)
    }
}

export class FileNotFound extends RpcException {
    constructor() {
        super('File not found')
    }
}