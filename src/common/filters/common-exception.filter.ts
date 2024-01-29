import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { RequestBodyException } from '../exceptions/request-body.exception';
import { CommonFilterResponse } from '../types/common-filter.response';
import { isResponseObject } from '../types/common-response-message.type.guard';

@Catch(RequestBodyException)
export class CommonExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const filterResponse = new CommonFilterResponse(
      status,
      request.url,
      exception.name,
      exceptionResponse,
    );

    if (isResponseObject(exceptionResponse)) {
      filterResponse.message = exceptionResponse.message;
    }

    response.status(status).send(filterResponse);
  }
}
