import { DictionaryFilter, QueryParamsModel, QueryResultsModel } from '@cms/core';

export abstract class IPaginationService {

  abstract applyDefaultValues(includeFilters?: boolean): void;

  abstract set queryParams(queryParams: QueryParamsModel);

  abstract get queryParams(): QueryParamsModel;

  abstract set filter(df: DictionaryFilter);

  abstract get filter(): DictionaryFilter;

  abstract set queryResults(queryResults: QueryResultsModel);

  abstract get queryResults(): QueryResultsModel;

}
