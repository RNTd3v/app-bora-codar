export interface QueryResultsModel {
  totalItems: number;
  totalPage: number;
  page: number;
  perPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  data: any [];
}
