import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { PokemonCreateDto } from './dto/pokemon-create.dto';
import { PokemonsRepository } from './pokemons.repository';
import { PokemonNotFoundException } from './exceptions/pokemon-not-found.exception';
import { Pokemon } from './models/pokemon.model';

@Injectable()
export class PokemonsService {
  private cacheKey = 'pokemons';
  constructor(
    private readonly pokemonsRepository: PokemonsRepository,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}
  async getAllPokemons() {
    return await this.pokemonsRepository.getAllPokemons();
  }
  async getPokemonById(id: string) {
    try {
      const pokemon = await this.pokemonsRepository.getPokemonById(id);
      return new Pokemon(pokemon);
    } catch (error) {
      throw new PokemonNotFoundException();
    }
  }
  async createPokemon(pokemonCreateDto: PokemonCreateDto) {
    return await this.pokemonsRepository.createPokemon(pokemonCreateDto);
  }
  async deletePokemon(id: string) {
    return await this.pokemonsRepository.deletePokemon(id);
  }
}
