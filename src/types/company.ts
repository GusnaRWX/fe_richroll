export declare namespace Company {
  export interface CompanyPayload {
    items: [];
  }

  export interface CompanyParams {
    id: number;
    data: CompanyProfilePayload;
  }

  export interface CompanyDetailPayload {
    id: number;
  }

  export interface CompanyProfilePayload {
    information: {
      imageUrl: string,
      typeId: number,
      name: string,
      npwp: string,
      sectorId: number,
      email: string,
      contact: string
    },
    address: {
      countryId: string,
      firstLevelCode: string,
      secondLevelCode: string,
      thirdLevelCode: string,
      fourthLevelCode: string,
      address: string,
      zipCode: string
    },
    bank: {
      bankId: number,
      accountName: string,
      accountNumber: string,
      bankCode: string,
      branchCode: string,
      branchName: string,
      swiftCode: string
    },
    payroll: {
      monthly: {
        periodStart: string,
        periodEnd: string,
        payrollDate: string,
        methodId: number
      },
      weekly: {
        period: string,
        methodId: number
      },
      biWeekly: {
        period: string,
        periodWeek: string,
        methodId: number
      }
    }
  }
}