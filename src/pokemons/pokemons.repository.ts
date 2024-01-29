import { Injectable } from '@nestjs/common';
import { PokemonCreateDto } from './dto/pokemon-create.dto';
import { PokemonEntity } from './entities/pokemon.entity';

@Injectable()
export class PokemonsRepository {
  async getPokemonById(id: string) {
    return await PokemonEntity.findByPk(id);
  }

  async createPokemon(pokemonCreateDto: PokemonCreateDto) {
    return await PokemonEntity.create(pokemonCreateDto);
  }

  async deletePokemon(id: string) {
    return await PokemonEntity.destroy({ where: { id } });
  }
}
