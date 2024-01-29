import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { PokemonCreateDto } from './dto/pokemon-create.dto';
import { PokemonsRepository } from './pokemons.repository';

@Injectable()
export class PokemonsService {
  private cacheKey = 'pokemons';
  constructor(
    private readonly pokemonsRepository: PokemonsRepository,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}
  async getAllPokemons() {
    try {
      return await this.pokemonsRepository.getAllPokemons();
    } catch (error) {
      throw new Error(error);
    }
  }
  async getPokemonById(id: string) {
    return await this.pokemonsRepository.getPokemonById(id);
  }
  async createPokemon(pokemonCreateDto: PokemonCreateDto) {
    return await this.pokemonsRepository.createPokemon(pokemonCreateDto);
  }
  async deletePokemon(id: string) {
    return await this.pokemonsRepository.deletePokemon(id);
  }
}
