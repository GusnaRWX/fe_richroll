export declare namespace Option {
  export interface CountryPayload {
    items: [];
  }

  export interface AdministrativeLevel {
    items: Array<{ code: string, name: string }>
  }

  export interface Banks {
    items: Array<{ id: string, alias: string }>
  }

  export interface Mapper {
    label: string;
    value: string;
  }
}