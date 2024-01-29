import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { PokemonCreateDto } from './dto/pokemon-create.dto';
import { PokemonsRepository } from './pokemons.repository';
import { PokemonNotFoundException } from './exceptions/pokemon-not-found.exception';
import { Pokemon } from './models/pokemon.model';
import { PaginatePokemontDto } from './dto/paginate-pokemon.dto';
import { Pager } from 'src/common/types/pager';
import { PaginatePokemon } from './models/paginate-pokemon.model';

@Injectable()
export class PokemonsService {
  private cacheKey = 'pokemons';
  constructor(
    private readonly pokemonsRepository: PokemonsRepository,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}
  async getAllPokemons(paginatePokemontDto: PaginatePokemontDto) {
    const pager = new Pager(paginatePokemontDto.page, paginatePokemontDto.size);
    const pokemons = await this.pokemonsRepository.getAllPokemons(pager);
    return new PaginatePokemon(pokemons, pager);
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
