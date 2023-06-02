export declare namespace workSchedule {
  interface InitialValuesWorkScheduleForm {
    profileName: string;
    type: string | number;
    flexiWorkHour: string,
    flexiMinWorkHour: string,
    fixedStartDay: string,
    fixedEndDay: string,
    fixedStartTime: string,
    fixedEndTime: string,
    fixedWorkDayType: string | number,
    flexiWorkDay: string,
    breakName: string,
    breakDuration: string | number,
    specifyBreakHour: boolean,
    breakStartTime: string,
    breakEndTime: string
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
    eventId: number,
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

  interface WorkScheduleParams {
    page: number;
    itemPerPage: number;
    sort: string;
    direction: boolean;
    search: string;
    companyID?: number;
  }
}