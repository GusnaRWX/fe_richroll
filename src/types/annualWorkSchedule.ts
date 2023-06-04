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

  interface AnnualWorkSchedulePayload {
    name: string;
    type: string | number;
    startDate: string | Date;
    endDate: string | Date;
    startHours: string;
    endHours: string;
    notes: string;
  }
}