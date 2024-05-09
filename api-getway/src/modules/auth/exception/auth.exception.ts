import { HttpException } from '@nestjs/common'
export class PasswordOrLoginWrong extends HttpException {
    constructor() {
        super('Password Or Login Wrong', 400)
    }
}