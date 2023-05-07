export declare namespace Employees {
  interface EmployeeParams {
    page: number;
    itemPerPage: number;
    sort: string;
    direction: boolean;
    search: string;
    status: string;
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
}