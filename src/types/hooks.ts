export declare namespace CustomHooks {
  export interface HandleInput {
    target: {
      name: string;
      value: string | string[] | number | number[];
    }
  }

  export interface Validate {
    [value: string]: string | string[] | number | number[];
  }
}