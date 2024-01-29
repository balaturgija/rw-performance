import { Paginated } from 'src/common/types/paginated';
import { Pokemon } from './pokemon.model';
import { Pager } from 'src/common/types/pager';

export interface PaginatePokemon {
  currenPage: number;
  totalPages: number;
  totalItems: number;
  items: Pokemon[];
}

export class PaginatePokemon {
  constructor({ rows, count }: Paginated<Pokemon>, pager: Pager) {
    this.currenPage = pager.pageNumber;
    this.totalPages = Math.ceil((rows.length + 1) / pager.pageSize);
    this.totalItems = count;
    this.items = rows.map((pokemon) => new Pokemon(pokemon));
  }
}
