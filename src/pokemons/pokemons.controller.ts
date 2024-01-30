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

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('pokemons')
  @CacheTTL(5)
  async paginatePokemons(@Query() pagiantePokemonsDto: PaginatePokemontDto) {
    return await this.pokemonsService.getAllPokemons(pagiantePokemonsDto);
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('pokemons')
  @CacheTTL(5)
  async getPokemonById(@Param('id') id: string) {
    return await this.pokemonsService.getPokemonById(id);
  }

  @Post()
  async createPokemon(@Body() createDataDto: PokemonCreateDto) {
    return await this.pokemonsService.createPokemon(createDataDto);
  }
  @Delete()
  async deletePokemon(@Param('id') id: string) {
    return await this.pokemonsService.deletePokemon(id);
  }
}
