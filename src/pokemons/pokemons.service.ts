import { Injectable } from '@nestjs/common';
import { PokemonsRepository } from './pokemons.repository';

@Injectable()
export class PokemonsService {
  constructor(private readonly pokemonsRepository: PokemonsRepository) {}
}
