export interface QueryParamsModel {
  sortBy: string;
  order: OrderEnum;
  page: number;
  perPage: number;
}

export interface DictionaryFilter {
  [filterName: string]: string;
}

export enum OrderEnum {
  ASC = 'ASC',
  DESC = 'DESC'
}
