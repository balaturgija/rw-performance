import { Injectable } from '@nestjs/common';

import { PokemonCreateDto } from './dto/pokemon-create.dto';
import { PokemonEntity } from './entities/pokemon.entity';
import { Pager } from 'src/common/types/pager';
import { Generation } from './types/generation';

@Injectable()
export class PokemonsRepository {
  async getAllPokemons(pager: Pager) {
    return await PokemonEntity.findAndCountAll({
      limit: pager.limit(),
      offset: pager.offset(),
    });
  }

  async findAll(generation: Generation) {
    return await PokemonEntity.findAll({ where: { generation } });
  }

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
