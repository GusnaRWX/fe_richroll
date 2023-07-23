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

  interface GetParamsCompleted {
    page: number;
    itemPerPage: number;
    sort?: string;
    direction?: boolean;
    search?: string;
    companyID: string;
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

  interface PayrollCompletedType {
    id: string,
    name: string,
    start: DayJS,
    end: DayJS,
    workflow: number,
    attachment: AttachmentType | null,
    attendance: PayrollType | null,
    gross: PayrollType | null,
    net: PayrollType | null,
    disbursement: PayrollType | null,
    createdAt: DayJS,
    updatedAt: DayJS,
  }

  interface PostPayrollType {
    companyID: string;
    name: string;
    start: string;
    end: string;
    workflow: number;
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
    payrollID?: string | number;
  }

  interface HocComponent {
    componentName: string;
    amount: string;
    id: string;
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

  interface GrossCalculationTerm {
    id: string;
    name: string;
  }

  interface GrossCalculationBase {
    id: string;
    name: string;
    amount: number;
    isTaxable: boolean;
    term: GrossCalculationTerm;
  }

  interface GrossCalculationOvertime {
    id: string;
    rate: string;
    duration: number;
    amount: number;
  }

  interface GrossCalculationSupplementary {
    id: string;
    name: string;
    amount: number;
    isTaxable: boolean;
    term: GrossCalculationTerm;
  }

  interface GrossCalculationAdHoc {
    id: string;
    name: string;
    amount: number;
  }

  interface GrossCalculation {
    base: GrossCalculationBase;
    overtime: GrossCalculationOvertime;
    supplementary: GrossCalculationSupplementary;
    adHoc: GrossCalculationAdHoc;
  }

  interface Employee {
    id: string;
    name: string;
    picture: string;
    grossCalculation: GrossCalculation;
  }

  interface Gross {
    id: string;
    totalBaseCompensation: number;
    totalSupplementaryCompensation: number;
    totalAddHokCompensation: number;
    totalGrossCompensation: number;
    employee: Employee;
  }

  interface DataGrossEmployeeDetail {
    id: string;
    totalBaseCompensation: number;
    totalSupplementaryCompensation: number;
    totalAddHokCompensation: number;
    totalGrossCompensation: number;
    gross: Gross[];
  }
  interface ParamsDetailAttendance {
    id: string | number;
    attendanceID: string | number;
    employeeID: string | number;
  }

  interface EventType {
    id: string | number;
    name: string;
    title: string;
    event_id: number;
    start: Date;
    end: Date;
    leaveType: number;
    isOvertime: boolean;
    multiplier: number;
    note: string;
    leaveStatus: number;
    color: string;
    isHalfDay: boolean;
  }

  interface AttendanceDetailType {
    id: string | number,
    employee: {
      id: string | number,
      name: string | number,
      picture: string | null
    },
    attendance: number,
    absent: number,
    paidLeave: number,
    unpaidLeave: number,
    overtime: number,
    totalHours: number,
    averageHours: number,
    events: Array<EventType>
  }

  interface DataNetDetail {
    gross: number,
    statutory: number,
    tax: number,
    grossAfterTax: number,
    nonTaxableDeduction: number,
    net: number,
    nets: Array<DataNetRow>
  }

  interface DataNetRow {
    gross: number,
    statutory: number,
    tax: number,
    grossAfterTax: number,
    nonTaxableDeduction: number,
    net: number,
    employee: {
      id: string,
      name: string,
      picture: string,
    } | null,
    summary: {
      base: number,
      supplementary: number,
      hoc: number,
      gross: number
    } | null,
    isTaxPayer: boolean,
    isStatusEmployee: boolean,
    statutes: {
      name: string,
      rates: number,
      amount: number,
      total: number,
      isSplit: boolean,
      paidRates: number,
      paidAmount: number,
      paidTotal: number
    } | null,
    deductions: {
      name: string,
      status: string,
      rates: number,
      amount: number,
      total: number,
    } | null,
    incomeTaxes: {
      income: number,
      rates: number,
      total: number
    } | null,
    nonTaxes: {
      name: string,
      total: number
    } | null
  }

  interface PostNetPayloadType {
    assistantID: string | null;
  }

  interface WorkflowType {
    workflow: number;
    status: number;
  }

  interface DisbursementsData {
    net: number,
    incomeTax: number,
    statutory: number,
    contribution: number,
    disbursement: number,
    employee: {
      id: string,
      name: string,
      picture: string
    }
  }

  interface Disbursements {
    id: string;
    attachment: {
      filename: string;
      link: string;
      size: string
    };
    receiptFile: string;
    isPaid: boolean;
    method: {
      id: string;
      name: string;
    }
    items: Array<DisbursementsData>
  }

  interface DisbursementData {
    net: number;
    incomeTax: number;
    statutory: number;
    contribution: number;
    disbursement: number;
    disbursements: Array<Disbursements>
  }

}

