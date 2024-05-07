import { RpcException } from "@nestjs/microservices";

export class LayerNotFound extends RpcException {
    constructor() {
        super('layer not found_$_404')
    }
}

export class FloorOrNameMustBeEntered extends RpcException {
    constructor() {
        super('floor or name must be entered_$_400')
    }
}