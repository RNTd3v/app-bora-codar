export interface Pagination {
  page: string;
  perPage: string;
  sortBy: string;
  order: 'ASC' | 'DESC';
  filter: string;
}
