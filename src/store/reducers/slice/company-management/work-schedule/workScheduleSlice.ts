import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface EventType {
  day: number,
  event_id: number,
  title: string,
  name: string,
  start: Date,
  end:Date,
  isBreak?: boolean,
  isDuration?: boolean,
  color?: string,
  duration?: number | string,
  allDay?: boolean,
  scheduleType?: string | number,
  type?: number
}

interface WorkScheduleState {
  isLoading: boolean;
  id: string | number;
  events: Array<EventType>,
  grossHour: number,
  netHour: number,
  name: string,
  data: []
}

const initialState: WorkScheduleState = {
  isLoading: false,
  id: '',
  events: [],
  grossHour: 0,
  netHour: 0,
  name: '',
  data: []
};

export const workScheduleSlice = createSlice({
  name: 'workSchedule',
  initialState,
  reducers: {
    getListWorkScheduleRequested: (state) => {
      state.isLoading = true;
    },
    getListWorkSchedulerSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    getListWorkSchedulerFailed: (state) => {
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
    },
    postWorkScheduleFailed: (state) => {
      state.isLoading = false;
    },
    getDetailWorkScheduleRequested: (state) => {
      state.isLoading = true;
    },
    getDetailWorkScheduleSuccess: (state, action) => {
      state.isLoading = false;
      state.id = action?.payload?.id;
      state.name = action?.payload?.name;
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
    getDetailWorkScheduleFailed: (state) => {
      state.isLoading = false;
    },
    deleteWorkScheduleRequested: (state) => {
      state.isLoading = true;
    },
    deleteWorkScheduleSuccess: (state) => {
      state.isLoading = false;
    },
    deleteWorkScheduleFailed: (state) => {
      state.isLoading = false;
    },
    patchWorkScheduleRequested: (state) => {
      state.isLoading = true;
    },
    patchWorkScheduleSuccess: (state) => {
      state.isLoading = false;
    },
    patchWorkScheduleFailed: (state) => {
      state.isLoading = false;
    },
    calculateGrossNet: (state, action) => {
      state.grossHour = action?.payload?.gross;
      state.netHour = action?.payload?.net;
    },
    clearState: (state) => {
      state.events = [];
      state.grossHour = 0;
      state.netHour = 0;
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
  postSimulationEventFailed,
  postSimulationEventRequested,
  postSimulationEventSuccess,
  postCalculateEventRequested,
  postCalculateEventFailed,
  postCalculateEventSuccess,
  postWorkScheduleFailed,
  postWorkScheduleRequested,
  postWorkScheduleSuccess,
  getListWorkScheduleRequested,
  getListWorkSchedulerFailed,
  getListWorkSchedulerSuccess,
  getDetailWorkScheduleFailed,
  getDetailWorkScheduleRequested,
  getDetailWorkScheduleSuccess,
  deleteWorkScheduleFailed,
  deleteWorkScheduleRequested,
  deleteWorkScheduleSuccess,
  patchWorkScheduleFailed,
  patchWorkScheduleRequested,
  patchWorkScheduleSuccess,
  calculateGrossNet,
  clearState
} = workScheduleSlice.actions;

export default workScheduleSlice.reducer;