export interface ApiError {
  status: number;
  name: string;
  message: string;
  description: string;
}

export interface ApiErrorResponse {
  data?: any;
  error?: ApiError;
}

export type ApiResponse<T> = T | ApiErrorResponse;

export type ApiPaginationMeta = (
  | {
      start: number;
      limit: number;
    }
  | {
      page: number;
      pageSize: number;
      pageCount?: number;
    }
) & {
  total?: number;
};

export interface ApiData<T> {
  id: number;
  attributes: T;
}

export interface ApiDocument<T> {
  data: ApiData<T>;
  meta?: {
    availableLocales?: string[];
  };
}

export interface ApiCollection<T> {
  data: Array<T>;
  meta: {
    pagination: ApiPaginationMeta;
  };
}
