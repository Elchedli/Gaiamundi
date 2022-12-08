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
