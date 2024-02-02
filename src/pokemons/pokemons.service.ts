import { Injectable } from '@nestjs/common';

import { PokemonCreateDto } from './dto/pokemon-create.dto';
import { PokemonsRepository } from './pokemons.repository';
import { PokemonNotFoundException } from './exceptions/pokemon-not-found.exception';
import { Pokemon } from './models/pokemon.model';
import { PaginatePokemontDto } from './dto/paginate-pokemon.dto';
import { Pager } from 'src/common/types/pager';
import { PaginatePokemon } from './models/paginate-pokemon.model';
import { RedisService } from 'src/redis/redis.service';
import { PokemonGenerationDto } from './dto/pokemon-generation.dto';

@Injectable()
export class PokemonsService {
  private CACHE_KEY = 'pokemons';
  constructor(
    private readonly pokemonsRepository: PokemonsRepository,
    private readonly redisService: RedisService,
  ) {}

  async findaAll(generationDto: PokemonGenerationDto) {
    const cachedItems = await this.redisService.getHash(
      this.CACHE_KEY,
      generationDto.generation,
    );
    if (cachedItems) {
      return JSON.parse(cachedItems).map((pokemon) => new Pokemon(pokemon));
    }
    const pokemons = await this.pokemonsRepository.findAll(
      generationDto.generation,
    );
    await this.redisService.setHash(
      this.CACHE_KEY,
      generationDto.generation,
      JSON.stringify(pokemons),
    );
    return pokemons.map((pokemon) => new Pokemon(pokemon));
  }
}
