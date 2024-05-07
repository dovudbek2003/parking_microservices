import { RpcException } from "@nestjs/microservices";

export class ServiceNotFound extends RpcException {
    constructor() {
        super('service not found_$_404')
    }
}

export class TariffIdOrPriceMustBeEntered extends RpcException {
    constructor() {
        super('tariffId or Price must be entered_$_400')
    }
}