import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AttendanceLeave } from '@/types/attendanceLeave';

interface OvertimeState {
  isLoading: boolean;
  data: Array<AttendanceLeave.OvertimeType>
}

const initialState: OvertimeState = {
  isLoading: false,
  data: []
};

export const overtimeSlice = createSlice({
  name: 'overtime',
  initialState,
  reducers: {
    getOvertimeRequested: (state) => {
      state.isLoading = true;
    },
    getOvertimeSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action?.payload.data;
    },
    getOvertimeFailed: (state) => {
      state.isLoading = false;
    },
    postOvertimeRequested: (state) => {
      state.isLoading = true;
    },
    postOvertimeSuccess: (state) => {
      state.isLoading = false;
    },
    postOvertimeFailed: (state) => {
      state.isLoading = false;
    },
    putOvertimeRequested: (state) => {
      state.isLoading = true;
    },
    putOvertimeSuccess: (state) => {
      state.isLoading = false;
    },
    putOvertimeFailed: (state) => {
      state.isLoading = false;
    },
    deleteOvertimeRequested: (state) => {
      state.isLoading = true;
    },
    deleteOvertimeSuccess: (state) => {
      state.isLoading = false;
    },
    deleteOvertimeFailed: (state) => {
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
  getOvertimeRequested,
  getOvertimeSuccess,
  getOvertimeFailed,
  postOvertimeRequested,
  postOvertimeSuccess,
  postOvertimeFailed,
  putOvertimeRequested,
  putOvertimeSuccess,
  putOvertimeFailed,
  deleteOvertimeRequested,
  deleteOvertimeSuccess,
  deleteOvertimeFailed
} = overtimeSlice.actions;

export default overtimeSlice.reducer;