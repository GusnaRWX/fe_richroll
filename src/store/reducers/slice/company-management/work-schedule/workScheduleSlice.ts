import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';


interface WorkScheduleState {
  isLoading: boolean;
  events: Array<{
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
    allDay?: boolean
  }>,
  grossHour: number,
  netHour: number
}

const initialState: WorkScheduleState = {
  isLoading: false,
  events: [],
  grossHour: 0,
  netHour: 0
};

export const workScheduleSlice = createSlice({
  name: 'workSchedule',
  initialState,
  reducers: {
    postSimulationEventRequested: (state) => {
      state.isLoading = true;
    },
    postSimulationEventSuccess: (state, action) => {
      state.isLoading = false;
      action?.payload?.events.map((item) => {
        state.events.push({
          day: item?.day,
          event_id: item.eventId,
          title: item.label,
          name: item.name,
          start: new Date(item.start),
          end: new Date(item.end),
          isBreak: item.isBreak,
          isDuration: item.isDuration,
          color: item.color,
          duration: item.duration,
          allDay: item.allDay
        });
      });
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
  postWorkScheduleSuccess
} = workScheduleSlice.actions;

export default workScheduleSlice.reducer;