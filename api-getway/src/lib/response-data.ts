export class ResponseData<T> {
    message: string;
    statusCode: number;
    data: T | null;
    error: Error | null;

    constructor(message: string, statusCode: number, data: T | null = null, error: Error | null = null) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
        this.error = error;
    }
}