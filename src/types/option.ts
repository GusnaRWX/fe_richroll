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
    items: Array<{ id: string, name: string }>
  }

  export interface Position {
    items: Array<{ id: string, name: string }>
  }

  export interface Cnb {
    items: Array<{ id: string | number, name: string, baseCompensation: [], supplementaryCompensation: [], createdAt: string, updatedAt: string }>
  }

  export interface Compensation {
    items: Array<{id: string | number, name: string, type: string | number}>
  }

  export interface Termin {
    items: Array<{id: string | number, name: string}>
  }

  export interface Mapper {
    label: string;
    value: string;
  }

  export interface FreesoloType {
    label: string | Element;
    value?: string;
    inputValue?: string
  }
}