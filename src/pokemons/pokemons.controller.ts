import { Controller, Get, Param, ParseEnumPipe, Query } from '@nestjs/common';

import { PokemonsService } from './pokemons.service';
import { PokemonGenerationDto } from './dto/pokemon-generation.dto';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { Generation } from './types/generation';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  @ApiQuery({ name: 'generation', enum: Generation, required: true })
  async findaAll(
    @Query()
    generationDto: PokemonGenerationDto,
  ) {
    return await this.pokemonsService.findaAll(generationDto);
  }
}
