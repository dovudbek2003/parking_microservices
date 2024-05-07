import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { ResponseData } from './response-data';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: any, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;

        /** Nima uchun false qiymat qaytayapti RcpException dan extend olib yaratilgan ku
         * user serviceda true qaytayapti bu yerda esa false
         */
        // console.log('exception instanceof => ', exception instanceof RpcException)  // false

        const ctx = host.switchToHttp();

        const responseBody = new ResponseData(
            '',
            HttpStatus.INTERNAL_SERVER_ERROR,
            null,
            exception,
        );

        if (exception instanceof HttpException) {
            responseBody.statusCode = exception.getStatus();
            const response = exception.getResponse() as Error;

            if (typeof response === 'string') {
                responseBody.message = response;
            } else {
                responseBody.message = response?.message.toString();
            }
        } else if (exception.status === 'error') {
            const [message, statusCode] = exception.message.split('_$_');
            responseBody.message = message;
            statusCode ? responseBody.statusCode = Number(statusCode) : HttpStatus.INTERNAL_SERVER_ERROR
        } else {
            responseBody.message = exception.message;
        }
        httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
    }
}
