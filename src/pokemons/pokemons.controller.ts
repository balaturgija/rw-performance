import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';

import { PokemonCreateDto } from './dto/pokemon-create.dto';
import { PokemonsService } from './pokemons.service';
import { PaginatePokemontDto } from './dto/paginate-pokemon.dto';
import { PokemonCacheInterceptor } from './pokemon-cache.interceptor';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  // paginated hash map example
  @Get('paginatePokemonsHashMap')
  async paginateHashMap(@Query() pagiantePokemonsDto: PaginatePokemontDto) {
    return await this.pokemonsService.paginateHashMap(pagiantePokemonsDto);
  }

  // key - value example

  @Get('collection')
  async getCollection() {
    return await this.pokemonsService.getCollection();
  }

  // paginated key - value with altered key
  @Get('keyValuePaginate')
  async keyValuePaginate(@Query() pagiantePokemonsDto: PaginatePokemontDto) {
    return await this.pokemonsService.keyValuePaginate(pagiantePokemonsDto);
  }

  // query key value collection
  @Get('queryKeyValue')
  async queryKeyValue(@Query() pagiantePokemonsDto: PaginatePokemontDto) {
    return await this.pokemonsService.queryKeyValue(pagiantePokemonsDto);
  }

  // sorted set
  @Get('sortedSet')
  async sortedSet() {
    return await this.pokemonsService.sortedSet();
  }

  @Get(':id')
  async getPokemonById(@Param('id') id: string) {
    return await this.pokemonsService.getPokemonById(id);
  }
}
