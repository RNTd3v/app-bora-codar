import { Injectable } from '@angular/core';
import { DictionaryFilter, IConfigService, Pagination } from '@cms/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements IConfigService {

  private filtersConfig = {} as DictionaryFilter;

  private paginationConfig = {
    page: '1',
    perPage: '12',
    sortBy: 'id',
    order: 'ASC'
  } as Pagination;

  constructor() { }

  set pagination(pagination: Pagination) {
    this.paginationConfig = pagination;
  }

  get pagination(): Pagination {
    return { ...this.paginationConfig, ...this.filter };
  }

  set filter(filter: DictionaryFilter) {
    this.filtersConfig = filter;
  }

  get filter(): DictionaryFilter {
    return this.filtersConfig;
  }

}
