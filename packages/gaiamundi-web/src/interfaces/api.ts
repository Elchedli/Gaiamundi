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

export interface ApiSingleContentType<T> {
  data: {
    id: number;
    attributes: T;
  };
  meta?: any;
}

export interface ApiCollectionContentType<T> {
  data?: {
    id: number;
    attributes: T;
  }[];
  meta?: any;
}

export interface DataCollectionType<T> {
  id: number;
  attributes: T;
}
