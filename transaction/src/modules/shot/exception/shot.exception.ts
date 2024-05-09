import { RpcException } from "@nestjs/microservices";

export class ShotNotFound extends RpcException{
    constructor() {
        super('shot not found_$_404')
    }
}