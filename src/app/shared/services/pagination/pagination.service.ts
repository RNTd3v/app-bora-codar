import { Injectable } from '@angular/core';
import { DictionaryFilter, IPaginationService, QueryParamsModel, QueryResultsModel } from '@cms/core';

const queryParamsDefault = {
  page: 1,
  perPage: 5,
  sortBy: 'id',
  order: 'ASC'
} as QueryParamsModel;

const queryResultsDefault = {
  totalItems: 10,
  totalPage: 1,
  page: 1,
  perPage: 10,
  hasPreviousPage: false,
  hasNextPage: false,
  data: []
} as QueryResultsModel;

@Injectable({
  providedIn: 'root'
})
export class PaginationService implements IPaginationService {

  private _filters = {} as DictionaryFilter;

  private _queryParams = queryParamsDefault;
  private _queryResults = queryResultsDefault;

  constructor() { }

  applyDefaultValues(): void {
    this._queryParams = queryParamsDefault;
    this._queryResults = queryResultsDefault;
    this._filters = {};
  }

  set queryParams(queryParams: QueryParamsModel) {
    this._queryParams = queryParams;
  }

  get queryParams(): QueryParamsModel {
    return { ...this._queryParams, ...this.filter };
  }

  set filter(df: DictionaryFilter) {
    this._filters = df;
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
