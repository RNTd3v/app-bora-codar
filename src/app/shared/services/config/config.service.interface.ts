import { DictionaryFilter, Pagination } from "@cms/core";

export abstract class IConfigService {

  abstract set pagination(pagination: Pagination);

  abstract get pagination(): Pagination;

  abstract set filter(filter: DictionaryFilter);

  abstract get filter(): DictionaryFilter;

}
