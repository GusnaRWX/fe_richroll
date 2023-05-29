import { IconType } from 'react-icons';
import { ButtonProps, CardProps, CheckboxProps, IconButtonProps, SelectProps, TextFieldProps, TextareaAutosizeProps } from '@mui/material';
import { ReactNode } from 'react';

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

  export interface InitialValuesRegister {
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
    countries: Array<{ label: string; value: string }>;
    doRegister: (_payload: Form) => void,
  }
}

export declare namespace Company {
  export interface Component {
    companies: [];
  }
  export interface Detail {
    picture: [],

    // Group Company Information
    companyType: string,
    companyName: string,
    companyNPWP?: string | null,
    companySector: string,
    companyEmail: string,
    phoneNumberPrefix: string,
    phoneNumber: string,

    // Group Company Address
    countryCompanyAddress: string,
    provinceCompanyAddress: string,
    cityCompanyAddress: string,
    subDistrictCompanyAddress: string,
    addressCompanyAddress: string,
    zipCodeCompanyAddress: string,

    // Group Bank Information
    bankBankInformation: string,
    bankAccountHolderNameBankInformation: string,
    bankAccoutNoBankInformation: string,
    bankCodeBankInformation?: string | null,
    branchCodeBankInformation?: string | null,
    branchNameBankInformation?: string | null,
    swiftCodeBankInformation?: string | null,

    // Group Payroll Information
    isMonthly?: boolean,
    isWeekly?: boolean,
    isBiWeekly?: boolean,
    monthlyPeriodStart?: string,
    monthlyPeriodEnd?: string,
    monthlyPayrollDate?: string,
    monthlyMethod?: string,
    weeklyPeriod?: string,
    weeklyMethod?: string,
    biWeeklyPeriod?: string,
    biWeeklyPeriodWeek?: string,
    biWeeklyMethod?: string
  }
}

export declare namespace CompanyCreate {
  export interface Component {
    companyType: [];
    companySector: [];
    bank: [];
    paymentMethod: [];
    countries: [];
  }
}

export declare namespace CompanyEdit {
  export interface Component {
    companyType: [];
    companySector: [];
    bank: [];
    paymentMethod: [];
    countries: [];
    detail;
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

  export type SelectInput = SelectProps & {
    customLabel?: string;
    options: Array<{ label: string, value: string }> | undefined;
    withAsterisk?: boolean;
    helperText?: string;
  }

  export type ComponentButton = ButtonProps & {
    label: string;
    isLoading?: boolean;
    buttonIcon?:unknown;
  }

  export type CheckboxInput = CheckboxProps & {
    customLabel: string;
  }

  export type ComponentIconButton = IconButtonProps & {
    parentColor?: string;
    icons: unknown
  }

  export type ComponentCard = CardProps & {
    children: ReactNode
  }

  export type ComponentTextarea = TextareaAutosizeProps & {
    customLabel?: string;
    withAsterisk?: boolean;
    error?: string;
  }
}

export declare namespace AuthEmployee {
  export interface SetNewPassword {
    email: string;
    token: string
  }

  export interface HaveAccount {
    email: string;
    token: string
  }
}