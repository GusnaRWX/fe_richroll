/* eslint-disable @typescript-eslint/no-explicit-any */

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
    // employeeID: string;
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
    templateID: string;
    name: string;
    base: {
      componentID: string;
      termID: string;
      isTaxable: boolean;
      amount?: number | string;
      amountType?: number | string;
      rate?: number | string;
      rateType?: number | string;
    },
    supplementaries: Array<{
      componentID: string;
      termID: string;
      isTaxable: boolean;
      amount?: number | string;
      amountType?: number | string;
      rate?: number | string;
      rateType?: number | string;
    }>
  }

  interface InformationValues {
    pictureBackend?: [],
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
    isActive: boolean
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
    templateID: string;
    name: string;
    base: {
      componentID: string;
      termID: string;
      isTaxable: boolean;
      amount?: number | string;
      amountType?: number | string;
      rate?: number | string;
      rateType?: number | string;
    },
    supplementaries: any;
    overtime: number;
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

  interface BreakItemType {
    name: string;
    start: DayJS;
    end: DayJS;
  }

  interface InitialValuesWorkScheduleForm {
    workScheduleID: string | number;
    profileName: string;
    type: string | number;
    dayType: number;
    day: Array<string | number>;
    startHour: DayJS;
    endHour: DayJS;
    flexiWorkHour: string | number;
    breakItem: Array<BreakItemType>;
  }

  interface PostSimulationEventPayloadType {
    name: string;
    schedulerType: string | number;
    type: string | number;
    startDay: string | number;
    endDay: string | number;
    startHour: string;
    endHour: string;
    isWithBreak?: boolean;
    spesificBreakHour?: boolean;
    breakHourName?: string;
    spesificBreakStartHour?: string;
    spesificBreakEndHour?: string;
  }

  interface PostCalculateEventPayloadType {
    items: Array<{
      schedulerType: number,
      startHour: string,
      endHour: string,
      isWithBreak: boolean,
      specificBreakHour: boolean,
      specificBreakStartHour: string,
      specificBreakEndHour: string
    }>
  }

  interface ItemsWorkScheduleType {
    day: number,
    eventId: string | number,
    label: string,
    name: string,
    start: Date | string,
    end: Date | string,
    isBreak?: boolean,
    isDuration?: boolean,
    color?: string,
    duration?: number | string,
    allDay?: boolean
    scheduleType?: string | number,
    type?: number
  }

  interface PostWorkSchedulePayloadType {
    workScheduleID?: string | number;
    name: string;
    grossHours: string | number;
    netHours: string | number;
    isCustom?: boolean,
    items: Array<ItemsWorkScheduleType>;
  }

  interface PostTerminateEmployee {
    terminateDate: string;
    terminateNote: string;
  }

  interface ContainerCnbDetail {
    id: string;
    component: {
      id: string;
      name: string;
      type: number
    },
    term: {
      id: string;
      name: string;
    },
    isTaxable: boolean;
    isBase: boolean;
    amount: number;
    amountType: number;
    rate: number;
    rateType: number;
  }

  interface GetEmployeeCnbDetail {
    data: {
      id: string;
      name: string;
      overtime: number;
      createdAt: string;
      updatedAt: string;
      base: ContainerCnbDetail;
      supplementaries: Array<ContainerCnbDetail>
    }
  }
}

