export declare namespace Auth {
  export interface Register {
    accessToken: string;
    refreshToken: string
  }

  export interface Login {
    accessToken: string;
    refreshToken: string
  }

  export interface LoginPayload {
    email: string;
    password: string;
  }

  export interface RegisterPayload {
    email: string;
    password: string;
    name: string;
    countryID: number;
    companyName: string;
    numberOfEmployees: number;
    phoneNumberPrefix: string;
    phoneNumber: string;
  }
}