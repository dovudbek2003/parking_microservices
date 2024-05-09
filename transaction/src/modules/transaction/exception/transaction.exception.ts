import { RpcException } from "@nestjs/microservices";

export class UserHasInsufficientFunds extends RpcException {
    constructor() {
        super('user has insufficient funds_$_400')
    }
}

export class TransactionNotFound extends RpcException {
    constructor() {
        super('transaction not found_$_404')
    }
}