import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { PokemonCreateDto } from './dto/pokemon-create.dto';
import { PokemonsService } from './pokemons.service';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('pokemons')
  @CacheTTL(5)
  async getAllPokemons() {
    return await this.pokemonsService.getAllPokemons();
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('pokemons')
  @CacheTTL(0)
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
