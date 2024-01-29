import { Module } from '@nestjs/common';

import { PokemonsController } from './pokemons.controller';
import { PokemonsRepository } from './pokemons.repository';
import { PokemonsService } from './pokemons.service';

@Module({
  controllers: [PokemonsController],
  providers: [PokemonsService, PokemonsRepository],
})
export class PokemonsModule {}
