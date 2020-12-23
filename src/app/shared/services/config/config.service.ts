import { Injectable } from '@angular/core';
import { IConfigService, Pagination } from '@cms/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements IConfigService {

  private paginationConfig = {
    page: '1',
    perPage: '12',
    sortBy: 'id',
    order: 'ASC',
    filter: ''
  } as Pagination;

  constructor() { }

  set pagination(pagination: Pagination) {
    this.paginationConfig = pagination;
  }

  get pagination(): Pagination {
    return this.paginationConfig;
  }

}
