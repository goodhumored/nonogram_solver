import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  logger = new Logger(AllExceptionFilter.name);
  catch(exception: Error, host: ArgumentsHost) {
    this.logger.error(`Error ${exception.name} happened ${exception.message}`, exception.stack);
    const res = host.switchToHttp().getResponse();
    res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    res.send({ message: exception.message, error: exception });
  }
}
