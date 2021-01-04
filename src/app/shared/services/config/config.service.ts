import { Injectable } from '@angular/core';
import { DictionaryFilter, IConfigService, QueryParamsModel, QueryResultsModel } from '@cms/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements IConfigService {

  private _filters = {} as DictionaryFilter;

  private _queryParams = {
    page: 1,
    perPage: 1,
    sortBy: 'id',
    order: 'ASC'
  } as QueryParamsModel;

  private _queryResults = {
    totalItems: 10,
    totalPage: 1,
    page: 1,
    perPage: 10,
    hasPreviousPage: false,
    hasNextPage: false,
    data: []
  } as QueryResultsModel;

  constructor() { }

  set queryParams(queryParams: QueryParamsModel) {
    this._queryParams = queryParams;
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

  set queryResults(queryResults: QueryResultsModel) {
    this._queryResults = queryResults;
  }

  get queryResults(): QueryResultsModel {
    return this._queryResults;
  }

}
