import { RpcException } from "@nestjs/microservices";

export class ParkNotFound extends RpcException {
    constructor() {
        super('park not found_$_404')
    }
}

export class ParkAlreadyExists extends RpcException {
    constructor() {
        super('park already exists_$_400')
    }
}