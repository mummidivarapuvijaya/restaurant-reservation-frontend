import { Reservation, User, Table, LoginResponse } from "../schemas";

export type { Reservation, User, Table, LoginResponse };

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface AxiosErrorResponse {
  response?: {
    data?: ApiError;
    status?: number;
  };
}
