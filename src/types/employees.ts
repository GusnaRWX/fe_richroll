import dayjs from 'dayjs';

type DayJS = dayjs.Dayjs | null | string;

export declare namespace Employees {
  interface EmployeeParams {
    page: number;
    itemPerPage: number;
    sort: string;
    direction: boolean;
    search: string;
    isActive: boolean;
    companyID?: number;
  }

  interface EmployeeInfoPayload {
    companyID: string;
    picture: string;
    fullName: string;
    nickname: string;
    phoneNumberPrefix: string;
    phoneNumber: string;
    email: string;
    isPermanent: boolean;
    department: string;
    position: string;
    isSelfService: boolean;
  }

  interface EmployeeInfoDetailPayload {
    picture: string;
    fullName: string;
    nickname: string;
    phoneNumber: string;
    email: string;
    startDate: string;
    endDate: string | null;
    isPermanent: boolean;
    department: string;
    position: string;
    isSelfService: boolean;
  }

  interface PersonalInformationPayload {
    employeeID: string;
    companyID: string;
    personal: {
      dateOfBirth?: string | Date;
      gender?: number;
      maritalStatus?: number;
      numberOfChildren?: number;
      countryID?: string;
      religion?: number
    };
    citizen: {
      countryID?: string,
      firstLevelCode?: string,
      secondLevelCode?: string,
      thirdLevelCode?: string,
      // fourthLevelCode?: string,
      address?: string,
      zipCode?: string,
      isCitizen?: boolean,
      isResident?: boolean
    },
    residential?: {
      countryID?: string,
      firstLevelCode?: string,
      secondLevelCode?: string,
      thirdLevelCode?: string,
      // fourthLevelCode?: string,
      address?: string,
      zipCode?: string,
      isCitizen?: boolean,
      isResident?: boolean
    },
    identity?: {
      type?: number,
      number?: number,
      expireAt?: string | Date,
      isPermanent?: boolean
    },
    bank?: {
      bankID?: string,
      holder?: string,
      accountNumber?: string,
      bankCode?: string,
      branchCode?: string,
      branchName?: string,
      swiftCode?: string
    }
  }

  interface PersonalValues {
    useResidentialAddress: boolean;
    // isPermanentPersonalID: boolean;
    dateofBirthPersonalInformation: DayJS;
    genderPersonalInformation: number;
    maritialStatusPersonalInformation: number;
    numberOfDependantsPersonalInformation: number | null;
    nationalityPersonalInformation: string;
    religionPersonalInformation: number

    countryCitizenAddress: string;
    provinceCitizenAddress: string;
    cityCitizenAddress: string;
    subDistrictCitizenAddress: string;
    addressCitizenAddress: string;
    zipCodeCitizenAddress: string;

    countryResidentialAddress: string;
    provinceResidentialAddress: string;
    cityResidentialAddress: string;
    subDistrictResidentialAddress: string;
    addressResidentialAddress: string;
    zipCodeResidentialAddress: string;

    bankBankInformation: string;
    bankAccountHolderNameBankInformation: string
    bankAccoutNoBankInformation: string;
    bankCodeBankInformation: string;
    branchCodeBankInformation: string;
    branchNameBankInformation: string;
    swiftCodeBankInformation: string,

    idTypePersonalID: string;
    idNumberPersonalID: string;
    idExpirationDatePersonalID: DayJS
  }

  interface CnbValues {
    profile: string;
    baseCompensation: string;
    baseTax: string;
    baseRate: string;
    basePeriod: string;
    suplementary: Array<{ compensation: string | number; tax: string; rate: string | number; period: string | number }>
  }

  interface InformationValues {
    companyID?: string;
    images: string
    picture: unknown
    fullName: string
    nickname: string
    phoneNumberPrefix: string
    phoneNumber: string
    email: string
    startDate: DayJS
    endDate: DayJS
    isPermanent: boolean
    department: string
    position: string
    isSelfService: boolean
  }

  interface EmergencyContactValues {
    // employeeID: string;
    fullNamePrimary: string;
    relationPrimary: string;
    phoneNumberPrefixPrimary: string;
    phoneNumberPrimary: string;
    fullNameSecondary: string;
    relationSecondary: string;
    phoneNumberPrefixSecondary: string;
    phoneNumberSecondary: string;
  }
  interface EmergencyContactPayload {
    employeeID: string;
    fullNamePrimary?: string;
    relationPrimary?: string;
    phoneNumberPrefixPrimary?: string;
    phoneNumberPrimary?: string;
    fullNameSecondary?: string;
    relationSecondary?: string;
    phoneNumberPrefixSecondary?: string;
    phoneNumberSecondary?: string;
  }

  interface CnbEmployeePayload {
    employeeID: string;
    compensationBenefitId: string;
    compensationBenefit: {
      companyId: number,
      name: string,
      baseCompensation: {
        compensationComponentId: number,
        taxStatus: boolean,
        amount: number,
        rate: number,
        period: string
      },
      supplementaryCompensations?: Array<string>
    }
  }

  interface PatchEmployeeInformation {
    companyID: string;
    picture?: unknown;
    fullName: string;
    nickname?: string;
    phoneNumberPrefix: string;
    phoneNumber: string;
    email: string;
    startDate: string;
    endDate: string;
    isPermanent: boolean;
    department?: string;
    position?: string;
    isSelfService: boolean;
  }

  interface EmergencyContactPatchValues {
    primaryId: string | number;
    secondaryId: string | number;
    fullNamePrimary: string;
    relationPrimary: string;
    phoneNumberPrefixPrimary: string;
    phoneNumberPrimary: string;
    fullNameSecondary: string;
    relationSecondary: string;
    phoneNumberPrefixSecondary: string;
    phoneNumberSecondary: string;
  }
}

