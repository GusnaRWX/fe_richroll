import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface EventType {
  event_id: number,
  title: string,
  start: Date,
  end: Date,
  name: string,
  color: string,
  type: number,
  isWithTime: boolean,
  deletable: boolean
}

interface AnnualScheduleState {
  isLoading: boolean,
  data: [],
  events: Array<EventType>,
  totalPages: number
}

const initialState: AnnualScheduleState = {
  isLoading: false,
  data: [],
  events: [],
  totalPages: 0
};

export const annualScheduleSlice = createSlice({
  name: 'annualSchedule',
  initialState,
  reducers: {
    getListAnnualScheduleRequested: (state) => {
      state.isLoading = true;
    },
    getListAnnualScheduleSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.totalPages = Math.ceil(action?.payload?.data?.itemTotals/5);
    },
    getListAnnualScheduleFailed: (state) => {
      state.isLoading = false;
    },
    getListEventRequested: (state) => {
      state.isLoading = false;
    },
    getListEventSuccess: (state, action) => {
      state.isLoading = false;
      const tempData: Array<EventType> = [];
      action?.payload?.data?.items.map((item) => {
        tempData.push({
          event_id: parseInt(item?.id),
          title: item?.name,
          start: new Date(item?.start),
          end: new Date(item?.end),
          name: item?.name,
          color: item?.eventType === 0 ? '#7C3AED' : '#D97706',
          type: item?.eventType,
          isWithTime: item?.isWithTime,
          deletable: true
        });
      });
      state.events = tempData;
    },
    getListEventFailed: (state) => {
      state.isLoading = false;
    },
    postAnnualScheduleRequested: (state) => {
      state.isLoading = true;
    },
    postAnnualScheduleSuccess: (state) => {
      state.isLoading = false;
    },
    postAnnualScheduleFailed: (state) => {
      state.isLoading = false;
    },
    updateAnnualScheduleRequested: (state) => {
      state.isLoading = true;
    },
    updateAnnualScheduleSuccess: (state) => {
      state.isLoading = false;
    },
    updateAnnualScheduleFailed: (state) => {
      state.isLoading = false;
    },
    deleteAnnualScheduleRequested: (state) => {
      state.isLoading = true;
    },
    deleteAnnualScheduleSuccess: (state) => {
      state.isLoading = false;
    },
    deleteAnnualScheduleFailed: (state) => {
      state.isLoading = false;
    },
    clearState: (state) => {
      state.events = [];
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
  getListAnnualScheduleFailed,
  getListAnnualScheduleRequested,
  getListAnnualScheduleSuccess,
  postAnnualScheduleFailed,
  postAnnualScheduleRequested,
  postAnnualScheduleSuccess,
  updateAnnualScheduleFailed,
  updateAnnualScheduleRequested,
  updateAnnualScheduleSuccess,
  deleteAnnualScheduleFailed,
  deleteAnnualScheduleRequested,
  deleteAnnualScheduleSuccess,
  clearState,
  getListEventFailed,
  getListEventRequested,
  getListEventSuccess
} = annualScheduleSlice.actions;

export default annualScheduleSlice.reducer;