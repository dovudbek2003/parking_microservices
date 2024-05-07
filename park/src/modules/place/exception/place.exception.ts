import { RpcException } from "@nestjs/microservices";

export class PlaceNotFound extends RpcException {
    constructor() {
        super('place not found_$_404')
    }
}