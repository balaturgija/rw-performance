import { Module } from '@nestjs/common';

import { PokemonsController } from './pokemons.controller';
import { PokemonsRepository } from './pokemons.repository';
import { PokemonsService } from './pokemons.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { PokemonsExceptionFilter } from './pokemons-exception.filter';
import { PokemonCacheInterceptor } from './pokemon-cache.interceptor';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  controllers: [PokemonsController],
  providers: [
    PokemonsService,
    PokemonsRepository,
    {
      provide: APP_FILTER,
      useClass: PokemonsExceptionFilter,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: PokemonCacheInterceptor,
    // },
  ],
})
export class PokemonsModule {}
