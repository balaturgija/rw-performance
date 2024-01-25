import { Module } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { PokemonsController } from './pokemons.controller';
import { PokemonsRepository } from './pokemons.repository';

@Module({
  controllers: [PokemonsController],
  providers: [PokemonsService, PokemonsRepository],
})
export class PokemonsModule {}
