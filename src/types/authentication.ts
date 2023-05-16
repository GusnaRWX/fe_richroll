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

  export interface ResetPasswordPayload {
    newPassword: string;
    confirmPassword: string;
    token: string;
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

  export interface Me {
    name: string;
    email: string;
    roles: string[] | null
  }

  export interface EmployeeSetNewPassword {
    email: string;
    password: string;
    confirmationPassword: string;
    token: string
  }
}
