import { Inject, Injectable } from '@nestjs/common';
import { PokemonsRepository } from './pokemons.repository';
import { PokemonCreateDto } from './dto/pokemon-create.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class PokemonsService {
  constructor(
    private readonly pokemonsRepository: PokemonsRepository,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}
  async getPokemonById(id: string) {
    const cachedData = await this.cacheService.get<{ name: string }>(id);

    if (cachedData) {
      console.log('Getting data from cache');
      return `${cachedData.name}`;
    }
    const { name } = await this.pokemonsRepository.getPokemonById(id);
    await this.cacheService.set(id, name);
    console.log('data set to cache', cachedData);
    return name;
  }
  async createPokemon(pokemonCreateDto: PokemonCreateDto) {
    return await this.pokemonsRepository.createPokemon(pokemonCreateDto);
  }
  async deletePokemon(id: string) {
    return await this.pokemonsRepository.deletePokemon(id);
  }
}
