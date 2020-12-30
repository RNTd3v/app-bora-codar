import { Injectable } from '@angular/core';
import { DictionaryFilter, IConfigService, QueryParamsModel } from '@cms/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements IConfigService {

  private _filters = {} as DictionaryFilter;

  private _queryParams = {
    page: 1,
    perPage: 10,
    sortBy: 'id',
    order: 'ASC'
  } as QueryParamsModel;

  constructor() { }

  set queryParams(queryParams: QueryParamsModel) {
    this.queryParams = queryParams;
  }

  get queryParams(): QueryParamsModel {
    return { ...this._queryParams, ...this.filter };
  }

  set filter(filter: DictionaryFilter) {
    this._filters = filter;
  }

  get filter(): DictionaryFilter {
    return this._filters;
  }

}
