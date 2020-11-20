import { RequestFilters } from './RequestFilters';

export interface PaginatedRequest {
  pageIndex: number;
  pageSize: number;
  columnNameForSorting: string;
  sortDirection: string;
  requestFilters?: RequestFilters;
}
