export declare namespace Services {
  export interface ApiResponse<T> {
    code: number;
    status: string;
    message: string;
    data: T
  }

  export interface ErrorResponse {
    code: number;
    status: string;
    message: string;
  }

  export interface ValidationResponse {
    code: number;
    status: string;
    message: string;
    errors: string[]
  }
}

