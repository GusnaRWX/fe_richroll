export declare namespace Login {
  export interface Form {
    email: string;
    password: string;
  }

  export interface Component {
    doLogin: (_payload: Form) => void
  }
}