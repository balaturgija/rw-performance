import { Injectable } from '@nestjs/common';

import { PokemonCreateDto } from './dto/pokemon-create.dto';
import { PokemonsRepository } from './pokemons.repository';
import { PokemonNotFoundException } from './exceptions/pokemon-not-found.exception';
import { Pokemon } from './models/pokemon.model';
import { PaginatePokemontDto } from './dto/paginate-pokemon.dto';
import { Pager } from 'src/common/types/pager';
import { PaginatePokemon } from './models/paginate-pokemon.model';
import { RedisService } from 'src/redis/redis.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PokemonsService {
  private cacheKey: string = 'pokemons';
  constructor(
    private readonly pokemonsRepository: PokemonsRepository,
    private readonly redisService: RedisService,
  ) {}
  async paginatePokemons(paginatePokemontDto: PaginatePokemontDto) {
    const cachedItems = await this.redisService.getKey(this.cacheKey);

    if (cachedItems) {
      const parsed = JSON.parse(cachedItems);
      return parsed.map((x: Pokemon) => plainToInstance(Pokemon, x));
    }

    const pager = new Pager(paginatePokemontDto.page, paginatePokemontDto.size);
    const pokemons = await this.pokemonsRepository.getAllPokemons(pager);
    const result = new PaginatePokemon(pokemons, pager);
    return result;
  }

  async getAllPokemons(paginatePokemontDto: PaginatePokemontDto) {
    const pager = new Pager(paginatePokemontDto.page, paginatePokemontDto.size);
    const pokemons = await this.pokemonsRepository.getAllPokemons(pager);
    await this.redisService.setHash(
      this.cacheKey,
      String(pager.pageNumber),
      JSON.stringify(pokemons),
    );
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
