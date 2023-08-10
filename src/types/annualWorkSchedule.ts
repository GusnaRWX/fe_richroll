import dayjs from 'dayjs';
export declare namespace AnnualWorkSchedule {

  type DayJS = dayjs.Dayjs | null | string;
  type Dates = string | Date | null;


  interface InitialValues {
    name: string;
    type: string | number;
    startDate: DayJS;
    endDate: DayJS;
    startHours: DayJS;
    endHours: DayJS;
    notes: string;
  }

  interface InitialValuesUpdate {
    id: string | number;
    name: string;
    type: string | number;
    startDate: Dates;
    endDate: Dates;
    startHours: Dates;
    endHours: Dates;
    notes: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
  }

  interface AnnualWorkSchedulePayload {
    name: string;
    type: string | number;
    startDate: string | Date;
    endDate: string | Date;
    startHours: string;
    endHours: string;
    notes: string;
  }

  interface PayloadSagaAnnualSchedule {
    companyID: string | number;
    name: string | number;
    eventType: number | string;
    startDate: DayJS;
    endDate: DayJS;
    startHour: DayJS;
    endHour: DayJS;
    isWithTime: boolean;
    note: string;
  }

  interface AnnualScheduleParams {
    page: number;
    itemPerPage: number;
    sort: string;
    direction: boolean;
    search: string;
    companyID: string | number;
    start: string;
    end: string;
  }
}