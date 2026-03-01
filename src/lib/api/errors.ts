import type { ApiResponse } from '@/types';

export class ApiError<T = unknown> extends Error {
  status: number;
  data?: ApiResponse<T> | T;

  constructor(status: number, message: string, data?: ApiResponse<T> | T) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export const normalizeApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof Error) {
    return new ApiError(0, error.message);
  }

  return new ApiError(0, 'Unexpected error');
};
