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

  interface PersonalInformationPayload {
    employeeID: string;
    personal: {
      dateOfBirth: string;
      gender: number;
      maritialStatus: number;
      numberOfChildren: number;
      countryID: string;
      religion: number
    };
    citizen: {
      countryID: string,
      firstLevelCode: string,
      secondLevelCode: string,
      thirdLevelCode: string,
      fourthLevelCode: string,
      address: string,
      zipCode: string,
      isCitizen: true,
      isResident: true
    },
    residential: {
      countryID: string,
      firstLevelCode: string,
      secondLevelCode: string,
      thirdLevelCode: string,
      fourthLevelCode: string,
      address: string,
      zipCode: string,
      isCitizen: true,
      isResident: true
    },
    identity: {
      type: 0,
      number: 0,
      expiredAt: string,
      isPermanent: true
    },
    bank: {
      bankID: string,
      holder: string,
      accountNumber: string,
      bankCode: string,
      branchCode: string,
      branchName: string,
      swiftCode: string
    }
  }
}