import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AttendanceLeave } from '@/types/attendanceLeave';

interface AccountState {
  isLoading: boolean;
  data: Array<AttendanceLeave.AttendanceType>;
}

const initialState: AccountState = {
  isLoading: false,
  data: [],
};

export const attendanceEntriesSlice = createSlice({
  name: 'attendanceEntries',
  initialState,
  reducers: {
    // get, suspend, delete, reactivate account
    getAttendanceRequested: (state) => {
      state.isLoading = true;
    },
    getAttendanceSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action?.payload.data;
    },
    getAttendanceFailed: (state) => {
      state.isLoading = false;
    },
    postAttendanceRequested: (state) => {
      state.isLoading = true;
    },
    postAttendanceSuccess: (state) => {
      state.isLoading = false;
    },
    postAttendanceFailed: (state) => {
      state.isLoading = false;
    },
    putAttendanceRequested: (state) => {
      state.isLoading = true;
    },
    putAttendanceSuccess: (state) => {
      state.isLoading = false;
    },
    putAttendanceFailed: (state) => {
      state.isLoading = false;
    },
    deleteAttendanceRequested: (state) => {
      state.isLoading = true;
    },
    deleteAttendanceSuccess: (state) => {
      state.isLoading = false;
    },
    deleteAttendanceFailed: (state) => {
      state.isLoading = false;
    },
    // end
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
  getAttendanceRequested,
  getAttendanceSuccess,
  getAttendanceFailed,
  postAttendanceRequested,
  postAttendanceSuccess,
  postAttendanceFailed,
  putAttendanceRequested,
  putAttendanceSuccess,
  putAttendanceFailed,
  deleteAttendanceRequested,
  deleteAttendanceSuccess,
  deleteAttendanceFailed
} = attendanceEntriesSlice.actions;

export default attendanceEntriesSlice.reducer;