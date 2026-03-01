export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
  meta?: PaginationMeta;
};

export type PaginationMeta = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type Paginated<T> = {
  items: T[];
  meta: PaginationMeta;
};
