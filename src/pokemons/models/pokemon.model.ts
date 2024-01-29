export interface Pokemon {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | undefined;
}

export class Pokemon {
  constructor(pokemon: Pokemon) {
    this.id = pokemon.id;
    this.name = pokemon.name;
    this.createdAt = pokemon.createdAt;
    this.updatedAt = pokemon.updatedAt;
    this.deletedAt = pokemon.deletedAt;
  }
}
