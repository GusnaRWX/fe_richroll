export declare namespace workSchedule {
  interface InitialValuesWorkScheduleForm {
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
}