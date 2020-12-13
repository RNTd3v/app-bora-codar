import { Pagination } from "@cms/core";

export abstract class IConfigService {

  abstract set pagination(pagination: Pagination);

  abstract get pagination(): Pagination;

}
