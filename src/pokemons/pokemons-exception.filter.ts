import { ArgumentsHost, Catch } from '@nestjs/common';
import { CommonExceptionFilter } from 'src/common/filters/common-exception.filter';
import { PokemonNotFoundException } from './exceptions/pokemon-not-found.exception';

@Catch(PokemonNotFoundException)
export class PokemonsExceptionFilter extends CommonExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    super.catch(exception, host);
  }
}
