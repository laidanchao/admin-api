import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch() // 捕获所有异常
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(typeof exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status, message;

    if (exception instanceof QueryFailedError) {
      const error: any = exception.driverError;
      if (error.code === '23505') {
        message = `数据已存在，请勿重复创建。${error.detail || error.message}`;
      } else {
        message = `${error.detail || error.message || exception.message}`;
      }
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    } else {
      // 确定状态码和错误信息
      status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      message =
        exception instanceof HttpException
          ? exception.getResponse()
          : 'Internal server error';
    }

    // 自定义响应格式
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: typeof message === 'object' ? JSON.stringify({ message }) : message ,
    });
  }
}