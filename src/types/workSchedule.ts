import dayjs from 'dayjs';
export declare namespace workSchedule {

  type DayJS = dayjs.Dayjs | null | string;


  interface InitialValuesWorkScheduleForm {
    name: string;
    scheduleType: string | number;
    type: number;
    day: Array<string | number>
    start: DayJS;
    end: DayJS;
    breaks: Array<BreakItemType>;
  }
  interface PostSimulationEventPayloadType {
    name: string;
    schedulerType: string | number;
    type: string | number;
    startDay: string | number;
    endDay: string | number;
    startHour: string;
    endHour: string;
    isWithBreak?: boolean;
    spesificBreakHour?: boolean;
    breakHourName?: string;
    spesificBreakStartHour?: string;
    spesificBreakEndHour?: string;
  }
  interface PostCalculateEventPayloadType {
    items: Array<{
      schedulerType: number,
      startHour: string,
      endHour: string,
      isWithBreak: boolean,
      specificBreakHour: boolean,
      specificBreakStartHour: string,
      specificBreakEndHour: string}>
  }
  interface ItemsWorkScheduleType {
    day: number,
    eventId: string | number,
    label: string,
    name: string,
    start: Date | string,
    end:Date | string,
    isBreak?: boolean,
    isDuration?: boolean,
    color?: string,
    duration?: number | string,
    allDay?: boolean
    scheduleType?: string | number,
    type?: number
  }

  interface ItemsPatchWorkScheduleType {
    day: number,
    eventId: string | number,
    label: string,
    name: string,
    start: Date | string,
    end:Date | string,
    isBreak?: boolean,
    isDuration?: boolean,
    color?: string,
    duration?: number | string,
    allDay?: boolean
    scheduleType?: string | number,
    type?: number
  }

  interface PostWorkSchedulePayloadType {
    companyID: string | number;
    name: string;
    grossHours: string | number;
    netHours: string | number;
    items: Array<ItemsWorkScheduleType>;
  }

  interface PatchWorkSchedulePayloadType {
    name: string;
    grossHours: string | number;
    netHours: string | number;
    items: Array<ItemsPatchWorkScheduleType>;
  }

  interface WorkScheduleParams {
    page: number;
    itemPerPage: number;
    sort: string;
    direction: boolean;
    search: string;
    companyID?: number;
  }

  interface BreakItemType {
    name: string;
    start: DayJS;
    end: DayJS;
  }

  interface WsFormType {
    profileName: string;
    type: string | number;
    dayType: number;
    day: Array<string | number>
    startHour: DayJS;
    endHour: DayJS;
    flexiWorkHour?: string | number;
    breakItem: Array<BreakItemType>;
  }
}