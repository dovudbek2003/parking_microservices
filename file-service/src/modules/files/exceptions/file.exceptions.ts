import { RpcException } from "@nestjs/microservices";

export class FileNotFoundException extends RpcException {
    constructor() {
        super("File not found_$_404")
    }
}