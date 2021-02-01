import { Injectable } from '@angular/core';
import { DictionaryFilter, IPaginationService, QueryParamsModel, QueryResultsModel } from '@cms/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

const queryParamsDefault = {
  page: 1,
  perPage: 10,
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
  private _totalPage: BehaviorSubject<number> = new BehaviorSubject<number>(undefined);

  private _queryParams = queryParamsDefault;
  private _queryResults = queryResultsDefault;

  constructor() { }

  setTotalPage(totalPage: number): void {
    this._totalPage.next(totalPage);
  }

  applyDefaultValues(): void {
    this._queryParams = queryParamsDefault;
    this._queryResults = queryResultsDefault;
    this._filters = {};
    this._totalPage.next(undefined);
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

  get totalPage(): Observable<number> {
    return this._totalPage.asObservable().pipe(filter(totalPage => totalPage !== undefined));
  }

}
