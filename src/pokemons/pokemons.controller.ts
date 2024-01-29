import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { PokemonCreateDto } from './dto/pokemon-create.dto';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  // @CacheKey('pokemons') // cache key
  @CacheTTL(30) // override TTL to 30 seconds
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
