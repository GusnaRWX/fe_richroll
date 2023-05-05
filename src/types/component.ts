import { IconType } from 'react-icons';
import { ButtonProps, IconButtonProps, TextFieldProps } from '@mui/material';

export declare namespace Login {
  export interface Form {
    email: string;
    password: string;
  }

  export interface Component {
    doLogin: (_payload: Form) => void
  }
}

export declare namespace Register {
  export interface Form {
    email: string;
    password: string;
    name: string;
    countryID: string;
    companyName: string;
    numberOfEmployees: string;
    phoneNumberPrefix: string;
    phoneNumber: string;
  }

  export interface Component {
    countries: [];
    doRegister: (_payload: Form) => void,
  }
}
export declare namespace CoreLayout {

  export interface SidebarItem {
    key: string;
    title: string;
    path: string;
    icons: IconType;
    hasChild?: boolean;
    child?: Array<{
      title: string;
      path: string;
    }>
  }
}

export declare namespace SharedComponent {
  export type ComponentInput = TextFieldProps & {
    customLabel?: string;
    withAsterisk?: boolean;
  }

  export type ComponentButton = ButtonProps & {
    label: string;
    isLoading?: boolean;
  }

  export type ComponentIconButton = IconButtonProps & {
    parentColor: string;
    icons: unknown
  }
}