import { DictionaryFilter, QueryParamsModel, QueryResultsModel } from '@cms/core';
import { Observable } from 'rxjs';

export abstract class IConfigService {

  abstract setTotalPage(totalPage: number): void;

  abstract applyDefaultValues(): void;

  abstract set queryParams(queryParams: QueryParamsModel);

  abstract get queryParams(): QueryParamsModel;

  abstract set filter(df: DictionaryFilter);

  abstract get filter(): DictionaryFilter;

  abstract set queryResults(queryResults: QueryResultsModel);

  abstract get queryResults(): QueryResultsModel;

  abstract get totalPage(): Observable<number>;

}
