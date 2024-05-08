import { RpcException } from "@nestjs/microservices";

export class UserNotFound extends RpcException {
    constructor() {
        super('user not found_$_404')
    }
}

export class UserAlreadyExists extends RpcException {
    constructor() {
        super('user already exists_$_400')
    }
}

export class PasswordOrLoginWrong extends RpcException {
    constructor() {
        super('password or login wrong_$_400')
    }
}