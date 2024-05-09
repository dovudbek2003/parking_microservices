import { HttpException, HttpStatus } from "@nestjs/common";

export class FileBadRequest extends HttpException {
    constructor(message) {
        super(`File type expected image but ${message}`, HttpStatus.BAD_REQUEST)
    }
}

export class FileNotFound extends HttpException {
    constructor() {
        super('File not found', HttpStatus.NOT_FOUND)
    }
}