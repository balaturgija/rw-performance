import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

import { RequestQueryException } from '../exceptions/request-query.exception';

@Injectable()
export class RequestQueryValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'query') return value;

    const object = await plainToInstance(metadata.metatype, value);
    const errors = await validate(object);

    if (errors.length) {
      const buildErrors = this.buildErrors(errors);
      throw new RequestQueryException(buildErrors);
    }

    return value;
  }

  private buildErrors(errors: ValidationError[]) {
    return errors.reduce((acc, err) => {
      const errorResult = err.children?.length
        ? this.buildErrors(err.children)
        : Object.values(err.constraints);

      acc.push(...errorResult);

      return acc;
    }, []);
  }
}
