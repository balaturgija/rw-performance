import { Injectable } from '@nestjs/common';

import { PokemonCreateDto } from './dto/pokemon-create.dto';
import { PokemonsRepository } from './pokemons.repository';
import { PokemonNotFoundException } from './exceptions/pokemon-not-found.exception';
import { Pokemon } from './models/pokemon.model';
import { PaginatePokemontDto } from './dto/paginate-pokemon.dto';
import { Pager } from 'src/common/types/pager';
import { PaginatePokemon } from './models/paginate-pokemon.model';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class PokemonsService {
  private CACHE_KEY_HASHMAP = 'pokemonsHashMap';
  private CACHE_KEY_KEY_VALUE_COLLECTION = 'pokemonsKeyValueCollection';
  constructor(
    private readonly pokemonsRepository: PokemonsRepository,
    private readonly redisService: RedisService,
  ) {}

  async paginateHashMap(paginatePokemontDto: PaginatePokemontDto) {
    const pager = new Pager(paginatePokemontDto.page, paginatePokemontDto.size);
    const cachedItems = await this.redisService.getHash(
      this.CACHE_KEY_HASHMAP,
      String(pager.pageNumber),
    );

    if (cachedItems) {
      const parsed: Pokemon[] = JSON.parse(cachedItems);
      const item = { rows: parsed, count: parsed.length };
      return new PaginatePokemon(item, pager);
    }
    const pokemons = await this.pokemonsRepository.getAllPokemons(pager);
    await this.redisService.setHash(
      this.CACHE_KEY_HASHMAP,
      String(pager.pageNumber),
      pokemons.rows,
    );
    return new PaginatePokemon(pokemons, pager);
  }

  async getCollection(): Promise<Pokemon[]> {
    const cachedItems = await this.redisService.getKey(
      this.CACHE_KEY_KEY_VALUE_COLLECTION,
    );
    if (cachedItems) {
      const parsed: Pokemon[] = JSON.parse(cachedItems);
      return parsed.map((x) => {
        return new Pokemon(x);
      });
    }
    const pokemons = await this.pokemonsRepository.findAll();
    await this.redisService.setKey(
      this.CACHE_KEY_KEY_VALUE_COLLECTION,
      JSON.stringify(pokemons),
    );
    return pokemons.map((x) => new Pokemon(x));
  }

  async keyValuePaginate(pagiantePokemonsDto: PaginatePokemontDto) {}

  async queryKeyValue(pagiantePokemonsDto: PaginatePokemontDto) {}

  async sortedSet() {
    const cachedItems = await this.redisService.getKey('pokemonsSortedSet');
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
