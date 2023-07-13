import dayjs from 'dayjs';

type DayJS = dayjs.Dayjs | null | string;

export declare namespace Payroll {
  interface GetParams {
    page: number;
    itemPerPage: number;
    sort?: string;
    direction?: boolean;
    search?: string;
    countryCode?: string;
    companyID: string;
    workflow: string;
    status: string;
  }

  interface AttachmentType {
    id: string,
    filename: string,
    link: string,
    workflow: number,
  }

  interface PayrollType {
    id: string,
    name: string,
    start: DayJS,
    end: DayJS,
    workflow: number,
    attachment: AttachmentType | null,
    createdAt: DayJS,
    updatedAt: DayJS,
  }

  interface PostPayrollType {
    companyID: string;
    name: string;
    start: string;
    end: string;
  }

  interface AddNonTaxable {
    componentId: string,
    amount: string,
  }
  interface PostPayrollAttendanceType {
    employees: Array<number | string>;
  }

  interface ParamsSelectedEmployee {
    page: number;
    itemPerPage: number;
    sort?: string;
    direction?: boolean;
    search?: string;
    countryCode?: string;
    payrollID?: string|number;
  }

  interface HocComponent {
    componentName: string;
    amount: string
  }

  interface OvertimeComponent {
    // rates: string;
    overtime: string;
    rate: string;
  }

  interface GrossRowForm {
    baseCompensationComponentId: string;
    amountBase: string;
    periodBase: string;
    taxStatusBase: string,

    hocComponent: HocComponent[] | [],
    overtimeComponent: OvertimeComponent
  }

}

