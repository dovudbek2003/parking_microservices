import { RpcException } from "@nestjs/microservices";

export class UserDetailNotFound extends RpcException{
    constructor() {
        super('user detail not found_$_404')
    }
}