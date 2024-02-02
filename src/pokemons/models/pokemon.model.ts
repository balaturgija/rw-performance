import { Generation } from '../types/generation';
import { PokemonType } from '../types/pokemon-type';

export interface Pokemon {
  id: string;
  name: string;
  generation: Generation;
  type: PokemonType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | undefined;
}

export class Pokemon {
  constructor(pokemon: Pokemon) {
    this.id = pokemon.id;
    this.name = pokemon.name;
    this.generation = pokemon.generation;
    this.type = pokemon.type;
    this.createdAt = pokemon.createdAt;
    this.updatedAt = pokemon.updatedAt;
    this.deletedAt = pokemon.deletedAt;
  }
}
