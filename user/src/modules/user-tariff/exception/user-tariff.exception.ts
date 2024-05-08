import { RpcException } from "@nestjs/microservices";

export class UserTariffNotFound extends RpcException {
    constructor() {
        super('user tariff not found_$_404')
    }
}