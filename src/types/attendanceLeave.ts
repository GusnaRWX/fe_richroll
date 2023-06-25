import dayjs from 'dayjs';

type DayJS = dayjs.Dayjs | null | string;

export declare namespace AttendanceLeave {
  interface GetParams {
    page: number;
    itemPerPage: number;
    sort: string;
    direction: boolean;
    search: string;
    companyID: string;
  }

  interface EmployeeType {
    employeeID: string | null,
    name: string,
    department: string | null,
    picture: string | null,
  }

  interface AttendanceType {
    id: string,
    employee: EmployeeType | null,
    date: DayJS,
    clockIn: DayJS,
    clockOut: DayJS
  }

  interface PostType {
    employeeID: string;
    clockIn: string;
    clockOut: string;
  }

  interface PostAttendance {
    date: DayJS;
    attendances: PostType[];
  }

  interface PutAttendance {
    clockIn: DayJS;
    clockOut: DayJS;
  }

}

