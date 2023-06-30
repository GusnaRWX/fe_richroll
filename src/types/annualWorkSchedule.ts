import dayjs from 'dayjs';
export declare namespace AnnualWorkSchedule {

  type DayJS = dayjs.Dayjs | null | string;


  interface InitialValues {
    name: string;
    type: string | number;
    startDate: string | DayJS | null;
    endDate: string | DayJS | null;
    startHours: string | DayJS | null;
    endHours: string | DayJS | null;
    notes: string;
  }

  interface InitialValuesUpdate {
    id: string | number;
    name: string;
    type: string | number;
    startDate: string | Date | null;
    endDate: string | Date | null;
    startHours: string | Date | null;
    endHours: string | Date | null;
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
    startDate: string | DayJS;
    endDate: string | DayJS;
    startHour: string | DayJS;
    endHour: string | DayJS;
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