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
    fixedWorkDayType: string,
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
  interface PostWorkSchedulePayloadType {
    companyID: string | number;
    name: string;
    grossHour: string | number;
    netHour: string | number;
    items: Array<string>;
  }
}