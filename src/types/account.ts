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
    name: string
  }

  interface UserType {
    createdAt: DayJS,
    name: string,
    email: string,
    isActive: boolean,
    suspensionStart: DayJS,
    suspensionEnd: DayJS,
    roles: Array<RolesType>,
    userInformation: object | null
  }

  interface AccountType {
    id: string,
    code: number | null,
    terminateDate: DayJS,
    terminateNote: string | null,
    user: UserType
  }

  interface PatcSuspension {
    start: string;
    end: string;
    isPermanent: boolean;
  }

}

