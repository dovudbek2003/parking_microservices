import { RpcException } from "@nestjs/microservices";

export class TariffNotFound extends RpcException{
    constructor() {
        super('tariff not found_$_404')
    }
}