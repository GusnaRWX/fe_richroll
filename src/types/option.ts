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

  export interface Department {
    items: Array<{id:  string, name: string}>
  }

  export interface Position {
    items: Array<{id:  string, name: string}>
  }

  export interface Mapper {
    label: string;
    value: string;
  }
}