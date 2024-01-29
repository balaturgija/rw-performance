import { Module } from '@nestjs/common';

import { PokemonsController } from './pokemons.controller';
import { PokemonsRepository } from './pokemons.repository';
import { PokemonsService } from './pokemons.service';
import { APP_FILTER } from '@nestjs/core';
import { PokemonsExceptionFilter } from './pokemons-exception.filter';

@Module({
  controllers: [PokemonsController],
  providers: [
    PokemonsService,
    PokemonsRepository,
    {
      provide: APP_FILTER,
      useClass: PokemonsExceptionFilter,
    },
  ],
})
export class PokemonsModule {}
