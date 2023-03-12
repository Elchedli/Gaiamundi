export interface ApiError {
  status?: number;
  name?: string;
  message?: string;
  description?: string;
  details?: {
    errors?: Array<{
      message: string;
      name: string;
      path: string[];
    }>;
  };
}

export interface ApiErrorResponse {
  data?: any;
  error?: ApiError;
}

export type ApiResponse<T> = T;

export type ApiPaginationMeta = {
  //
  start?: number;
  limit?: number;
  // OR
  page?: number;
  pageSize?: number;
  pageCount?: number;
  // Always
  total: number;
};

export type ApiData<T> = T & {
  id: number;
  created_at: string;
  updated_at: string;
};

export interface ApiDocument<T> {
  data: ApiData<T>;
  meta?: {
    availableLocales?: string[];
  };
}

export interface ApiCollection<T> {
  data: Array<ApiData<T>>;
  meta: {
    pagination: ApiPaginationMeta;
  };
}
