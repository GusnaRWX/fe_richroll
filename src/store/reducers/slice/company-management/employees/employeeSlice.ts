import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface EventType {
  day: number,
  event_id: number,
  title: string,
  name: string,
  start: Date,
  end: Date,
  isBreak?: boolean,
  isDuration?: boolean,
  color?: string,
  duration?: number | string,
  allDay?: boolean,
  scheduleType?: string | number,
  type?: number
}

interface EmployeeState {
  isLoading: boolean;
  data: [];
  employeeID: string | number;
  employeeInformationDetail: object;
  personalInformationDetail: object;
  detailCnb: object;
  emergencyContactDetail: object;
  events: Array<EventType>;
  grossHour: number;
  netHour: number;
  workScheduleId: string | number;
  workScheduleDetail: {
    events: Array<EventType>;
    grossHour: number;
    name: string;
    netHour: number;
    workScheduleId: string | number;
  },
  employeeCnbDetail: object
}

const initialState: EmployeeState = {
  isLoading: false,
  data: [],
  employeeID: '',
  employeeInformationDetail: {},
  personalInformationDetail: {},
  detailCnb: {},
  emergencyContactDetail: {},
  events: [],
  grossHour: 0,
  netHour: 0,
  workScheduleId: '',
  workScheduleDetail: {
    events: [],
    name: '',
    grossHour: 0,
    netHour: 0,
    workScheduleId: ''
  },
  employeeCnbDetail: {}
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    getEmployeeRequested: (state) => {
      state.isLoading = true;
    },
    getEmployeeSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    getEmployeeFailed: (state) => {
      state.isLoading = false;
    },
    postEmployeeInfoRequested: (state) => {
      state.isLoading = true;
    },
    postEmployeeInfoSuccess: (state, action) => {
      state.isLoading = false;
      state.employeeID = action.payload;
    },
    postEmployeeInfoFailed: (state) => {
      state.isLoading = false;
    },
    postEmergencyRequested: (state) => {
      state.isLoading = true;
    },
    postEmergencySuccess: (state) => {
      state.isLoading = false;
    },
    postEmergencyFailed: (state) => {
      state.isLoading = false;
    },
    postPersonalInformationRequested: (state) => {
      state.isLoading = true;
    },
    postPersonalInformationSuccess: (state) => {
      state.isLoading = false;
    },
    postPersonalInformationFailed: (state) => {
      state.isLoading = false;
    },
    employeeInfoDetailRequested: (state) => {
      state.isLoading = true;
    },
    employeeInfoDetailSuccess: (state, action) => {
      state.isLoading = false;
      state.employeeInformationDetail = action?.payload?.data;
    },
    employeeInfoDetailFailed: (state) => {
      state.isLoading = false;
    },
    personalInfoDetailRequested: (state) => {
      state.isLoading = true;
    },
    personalInfoDetailSuccess: (state, action) => {
      state.isLoading = false;
      state.personalInformationDetail = action?.payload?.data;
    },
    personalInfoDetailFailed: (state) => {
      state.isLoading = false;
    },
    getDetailCnbRequested: (state) => {
      state.isLoading = true;
    },
    getDetailCnbSuccess: (state, action) => {
      state.isLoading = false;
      state.detailCnb = action?.payload?.data;
    },
    getDetailCnbFailed: (state) => {
      state.isLoading = false;
    },
    postCnbEmployeeRequested: (state) => {
      state.isLoading = true;
    },
    postCnbEmployeeSuccess: (state) => {
      state.isLoading = false;
    },
    postCnbEmployeeFailed: (state) => {
      state.isLoading = false;
    },
    emergencyContactDetailRequested: (state) => {
      state.isLoading = true;
    },
    emergencyContactDetailSuccess: (state, action) => {
      state.isLoading = false;
      state.emergencyContactDetail = action?.payload?.data;
    },
    emergencyContactDetailFailed: (state) => {
      state.isLoading = false;
    },
    patchEmployeeInformationRequested: (state) => {
      state.isLoading = true;
    },
    patchEmployeeInformationSuccess: (state) => {
      state.isLoading = false;
    },
    patchEmployeeInformationFailed: (state) => {
      state.isLoading = false;
    },
    patchEmergencyContactRequested: (state) => {
      state.isLoading = true;
    },
    patchEmergencyContactSuccess: (state) => {
      state.isLoading = false;
    },
    patchEmergencyContactFailed: (state) => {
      state.isLoading = false;
    },
    patchPersonalRequested: (state) => {
      state.isLoading = true;
    },
    patchPersonalSuccess: (state) => {
      state.isLoading = false;
    },
    patchPersonalFailed: (state) => {
      state.isLoading = false;
    },
    getDetailWorkScheduleRequested: (state) => {
      state.isLoading = true;
    },
    getDetailWorkSchedulerSuccess: (state, action) => {
      state.isLoading = false;
      state.workScheduleId = action?.payload?.id;
      state.grossHour = action?.payload?.grossHour;
      state.netHour = action?.payload?.netHour;
      const tempData: Array<EventType> = [];
      action?.payload?.events.map((item) => {
        tempData.push({
          day: item.day,
          event_id: item.eventId,
          title: item.name,
          name: item.name,
          start: new Date(item.start),
          end: new Date(item.end),
          isBreak: item.isBreak,
          isDuration: item.isDuration,
          color: item.color,
          duration: item.duration,
          allDay: item.allDay,
          scheduleType: item.scheduleType,
          type: item.type
        });
      });
      state.events = tempData;
    },
    getDetailWorkSchedulerFailed: (state) => {
      state.isLoading = false;
    },
    postSimulationEventRequested: (state) => {
      state.isLoading = true;
    },
    postSimulationEventSuccess: (state, action) => {
      state.isLoading = false;
      const tempData: Array<EventType> = [];
      action?.payload?.events.map((item) => {
        tempData.push({
          day: item.day,
          event_id: item.eventId,
          title: item.name,
          name: item.name,
          start: new Date(item.start),
          end: new Date(item.end),
          isBreak: item.isBreak,
          isDuration: item.isDuration,
          color: item.color,
          duration: item.duration,
          allDay: item.allDay,
          scheduleType: item.scheduleType,
          type: item.type
        });
      });
      state.events = tempData;
    },
    postSimulationEventFailed: (state) => {
      state.isLoading = false;
    },
    postCalculateEventRequested: (state) => {
      state.isLoading = true;
    },
    postCalculateEventSuccess: (state, action) => {
      state.isLoading = false;
      state.grossHour = action?.payload?.grossHour;
      state.netHour = action?.payload?.netHour;
    },
    postCalculateEventFailed: (state) => {
      state.isLoading = false;
    },
    postWorkScheduleRequested: (state) => {
      state.isLoading = true;
    },
    postWorkScheduleSuccess: (state) => {
      state.isLoading = false;
      state.employeeID = '';
    },
    postWorkScheduleFailed: (state) => {
      state.isLoading = false;
    },
    getViewWorkScheduleRequested: (state) => {
      state.isLoading = true;
    },
    getViewWorkScheduleSuccess: (state, action) => {
      state.isLoading = false;
      state.workScheduleDetail.workScheduleId = action?.payload?.id;
      state.workScheduleDetail.grossHour = action?.payload?.grossHour;
      state.workScheduleDetail.netHour = action?.payload?.netHour;
      state.workScheduleDetail.name = action?.payload?.name;
      state.grossHour = action?.payload?.grossHour;
      state.netHour = action?.payload?.netHour;
      const tempData: Array<EventType> = [];
      action?.payload?.events.map((item) => {
        tempData.push({
          day: item.day,
          event_id: item.eventId,
          title: item.name,
          name: item.name,
          start: new Date(item.start),
          end: new Date(item.end),
          isBreak: item.isBreak,
          isDuration: item.isDuration,
          color: item.color,
          duration: item.duration,
          allDay: item.allDay,
          scheduleType: item.scheduleType,
          type: item.type
        });
      });
      state.workScheduleDetail.events = tempData;
    },
    getViewWorkScheduleFailed: (state) => {
      state.isLoading = false;
    },
    postTerminateEmployeeRequested: (state) => {
      state.isLoading = true;
    },
    postTerminateEmployeeSuccess: (state) => {
      state.isLoading = false;
    },
    postTerminateEmployeeFailed: (state) => {
      state.isLoading = false;
    },
    patchWorkScheduleRequested: state => {
      state.isLoading = true;
    },
    patchWorkScheduleSuccess: state => {
      state.isLoading = false;
    },
    patchWorkScheduleFailed: state => {
      state.isLoading = false;
    },
    clearWorkScheduleState: (state) => {
      state.events = [];
      state.grossHour = 0;
      state.netHour = 0;
    },
    getEmployeeCnbDetailRequested: state => {
      state.isLoading = true;
    },
    getEmployeeCnbDetailSuccess: (state, action) => {
      state.isLoading = false;
      state.employeeCnbDetail = action.payload;
    },
    getEmployeeCnbDetailFailed: state => {
      state.isLoading = false;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    }
  }
});

export const {
  getEmployeeRequested,
  getEmployeeSuccess,
  getEmployeeFailed,
  postEmployeeInfoRequested,
  postEmployeeInfoSuccess,
  postEmployeeInfoFailed,
  postEmergencyRequested,
  postEmergencyFailed,
  postEmergencySuccess,
  postPersonalInformationRequested,
  postPersonalInformationSuccess,
  postPersonalInformationFailed,
  employeeInfoDetailRequested,
  employeeInfoDetailFailed,
  employeeInfoDetailSuccess,
  personalInfoDetailRequested,
  personalInfoDetailFailed,
  personalInfoDetailSuccess,
  getDetailCnbFailed,
  getDetailCnbRequested,
  getDetailCnbSuccess,
  postCnbEmployeeRequested,
  postCnbEmployeeSuccess,
  postCnbEmployeeFailed,
  emergencyContactDetailFailed,
  emergencyContactDetailRequested,
  emergencyContactDetailSuccess,
  patchEmployeeInformationRequested,
  patchEmployeeInformationSuccess,
  patchEmployeeInformationFailed,
  patchEmergencyContactRequested,
  patchEmergencyContactSuccess,
  patchEmergencyContactFailed,
  patchPersonalRequested,
  patchPersonalSuccess,
  patchPersonalFailed,
  postSimulationEventFailed,
  postSimulationEventRequested,
  postSimulationEventSuccess,
  postCalculateEventRequested,
  postCalculateEventFailed,
  postCalculateEventSuccess,
  postWorkScheduleFailed,
  postWorkScheduleRequested,
  postWorkScheduleSuccess,
  getDetailWorkScheduleRequested,
  getDetailWorkSchedulerFailed,
  getDetailWorkSchedulerSuccess,
  getViewWorkScheduleFailed,
  getViewWorkScheduleRequested,
  getViewWorkScheduleSuccess,
  postTerminateEmployeeFailed,
  postTerminateEmployeeRequested,
  postTerminateEmployeeSuccess,
  clearWorkScheduleState,
  patchWorkScheduleRequested,
  patchWorkScheduleSuccess,
  patchWorkScheduleFailed,
  getEmployeeCnbDetailRequested,
  getEmployeeCnbDetailSuccess,
  getEmployeeCnbDetailFailed
} = employeeSlice.actions;

export default employeeSlice.reducer;