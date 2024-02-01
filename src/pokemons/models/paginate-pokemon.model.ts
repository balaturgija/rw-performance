import { Paginated } from 'src/common/types/paginated';
import { Pokemon } from './pokemon.model';
import { Pager } from 'src/common/types/pager';

export interface PaginatePokemon {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  items: Pokemon[];
}

export class PaginatePokemon {
  constructor({ rows, count }: Paginated<Pokemon>, pager: Pager) {
    this.currentPage = pager.pageNumber;
    this.totalPages = Math.ceil(count / pager.pageSize);
    this.totalItems = count;
    this.items = rows.map((pokemon) => new Pokemon(pokemon));
  }
}
