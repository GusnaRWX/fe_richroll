import dayjs from 'dayjs';

type DayJS = dayjs.Dayjs | null | string;
type Status = 'active' | 'suspended' | 'deleted';
type SearchType = 'company_listed' | 'employee_name' | 'all'

export declare namespace Account {
  interface AccountParams {
    page: number;
    itemPerPage: number;
    sort: string;
    direction: boolean;
    search: string;
    status: Status;
    searchType: SearchType;
  }

  interface RolesType {
    id: string,
    name: string,
  }

  interface CompaniesType {
    createdAt: DayJS,
    employeesTotal: number,
    id: string,
    name: string,
  }

  interface EmployeeType {
    code: string,
    companies: CompaniesType[],
    terminateEnd: DayJS,
    terminateStart: string | null,
  }

  interface AccountType {
    createdAt: DayJS,
    deletedAt: DayJS,
    email: string,
    employee: EmployeeType | null,
    id: string,
    isActive: boolean,
    lastLoginAt: string | null,
    name: string,
    roles: Array<RolesType>,
    suspensionEnd: DayJS,
    suspensionStart: DayJS,
    userInformation: object | null
  }

  interface PatcSuspension {
    start: string;
    end: string;
    isPermanent: boolean;
  }

}

