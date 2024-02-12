import { ArgumentsHost, Catch } from '@nestjs/common';
import { CommonExceptionFilter } from 'src/common/filters/common-exception.filter';

import { OrderCreateException } from './exceptions/order-create.exception';

@Catch(OrderCreateException)
export class AddressesExceptionFilter extends CommonExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
