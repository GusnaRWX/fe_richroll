import dayjs from 'dayjs';

type DayJS = dayjs.Dayjs | null | string;

export declare namespace AttendanceLeave {
  interface GetParams {
    page: number;
    itemPerPage: number;
    sort?: string;
    direction?: boolean;
    search?: string;
    companyID: string;
  }

  interface EmployeeType {
    employeeID: string | null,
    name: string,
    department: string | null,
    picture: string | null,
  }

  interface DepartmentType {
    name: string;
  }

  interface AttendanceType {
    id: string,
    employee: EmployeeType | null,
    date: DayJS,
    clockIn: DayJS,
    clockOut: DayJS
  }

  interface OvertimeType {
    id: string,
    employee: EmployeeType | null ,
    date: DayJS,
    start: DayJS,
    duration: string,
    multiplier: string
  }

  interface PostType {
    employeeID: string;
    clockIn: string;
    clockOut: string;
  }

  interface PostTypeOvertime {
    employeeID: string;
    start: string;
    duration: string;
    multiplier: string
  }

  interface PostOvertime {
    date: DayJS;
    overtimes: PostTypeOvertime[]
  }

  interface PostAttendance {
    date: DayJS;
    attendances: PostType[];
  }

  interface PutAttendance {
    clockIn: DayJS;
    clockOut: DayJS;
  }

  interface PutOvertime {
    start: string;
    duration: string;
    multiplier: string
  }

  interface PostLeave {
    employeeID: string;
    start: string;
    end: string;
    note: string;
    leaveType: number;
    leaveStatus: number;
    isHalfday: boolean;
  }

  interface LeaveEntriesList {
    date: string;
    employee: {
      department: string;
      employeeID: string;
      name: string;
      picture: string
    },
    end: string;
    id: string;
    leaveStatus: string;
    leaveType: string;
    start: string;
    note: string;
    isHalfday: boolean;
  }

  interface PutLeave {
    id: string;
    data: Omit<PostLeave, 'employeeID'>
  }

}

