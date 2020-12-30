import { DictionaryFilter, QueryParamsModel } from "@cms/core";

export abstract class IConfigService {

  abstract set queryParams(queryParams: QueryParamsModel);

  abstract get queryParams(): QueryParamsModel;

  abstract set filter(filter: DictionaryFilter);

  abstract get filter(): DictionaryFilter;

}
