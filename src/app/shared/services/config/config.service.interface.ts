import { DictionaryFilter, QueryParamsModel, QueryResultsModel } from "@cms/core";

export abstract class IConfigService {

  abstract set queryParams(queryParams: QueryParamsModel);

  abstract get queryParams(): QueryParamsModel;

  abstract set filter(filter: DictionaryFilter);

  abstract get filter(): DictionaryFilter;

  abstract set queryResults(queryResults: QueryResultsModel);

  abstract get queryResults(): QueryResultsModel;

}
