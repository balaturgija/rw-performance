export interface Pager {
  pageNumber: number;
  pageSize: number;
}

export class Pager {
  constructor(pageNumber = 1, pageSize = 15) {
    this.pageNumber = Number(pageNumber);
    this.pageSize = Number(pageSize);
  }

  limit() {
    return this.pageSize;
  }

  offset() {
    return (this.pageNumber - 1) * this.pageSize;
  }
}
