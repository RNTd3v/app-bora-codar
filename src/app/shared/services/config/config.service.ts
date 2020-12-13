import { Injectable } from '@angular/core';
import { IConfigService, Pagination } from '@cms/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements IConfigService {

  private paginationConfig: Pagination = {
    page: '1',
    perPage: '12',
    sortBy: 'id',
    order: 'ASC'
  }

  constructor() { }

  set pagination(pagination: Pagination) {
    this.paginationConfig = pagination;
  }

  get pagination(): Pagination {
    return this.paginationConfig;
  }

}
