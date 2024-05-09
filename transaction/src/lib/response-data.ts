export class ResponseData<T> {
    message: string;
    statusCode: number;
    data: T | null;

    constructor(message: string, statusCode: number, data: T | null = null) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }
}