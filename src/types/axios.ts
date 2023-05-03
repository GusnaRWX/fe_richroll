import { AxiosResponse } from 'axios';

export declare namespace Services {
  export interface ApiResponse<T> extends AxiosResponse {
    data: {
      code: number;
      status: string;
      message: string;
      data: T
    }
  }

  export interface ErrorResponse extends AxiosResponse {
    data: {
      code: number;
      status: string;
      message: string;
    }
  }

  export interface ValidationResponse extends AxiosResponse {
    data: {
      code: number;
      status: string;
      message: string;
      errors: string[]
    }
  }
}

