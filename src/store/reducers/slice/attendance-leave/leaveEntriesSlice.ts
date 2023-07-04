import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface LeaveEntriesState {
  loading: boolean;
  leaveEntriesData: []
}

const initialState: LeaveEntriesState = {
  loading: false,
  leaveEntriesData: []
};

export const leaveEntriesSlice = createSlice({
  name: 'leaveEntries',
  initialState,
  reducers: {
    getLeaveEntriesRequested: state => {
      state.loading = true;
    },
    getLeaveEntriesSuccess: (state, action) => {
      state.loading = false;
      state.leaveEntriesData = action.payload;
    },
    getLeaveEntriesFailed: state => {
      state.loading = false;
    },
    postLeaveEntriesRequested: state => {
      state.loading = true;
    },
    postLeaveEntriesSuccess: state => {
      state.loading = false;
    },
    postLeaveEntriesFailed: state => {
      state.loading = false;
    },
    deleteLeaveEntriesRequested: state => {
      state.loading = true;
    },
    deleteLeaveEntriesSuccess: state => {
      state.loading = false;
    },
    deleteLeaveEntriesFailed: state => {
      state.loading = false;
    },
    putLeaveEntriesRequested: state => {
      state.loading = true;
    },
    putLeaveEntriesSuccess: state => {
      state.loading = false;
    },
    putLeaveEntriesFailed: state => {
      state.loading = false;
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
  getLeaveEntriesRequested,
  getLeaveEntriesSuccess,
  getLeaveEntriesFailed,
  postLeaveEntriesRequested,
  postLeaveEntriesSuccess,
  postLeaveEntriesFailed,
  deleteLeaveEntriesRequested,
  deleteLeaveEntriesSuccess,
  deleteLeaveEntriesFailed,
  putLeaveEntriesRequested,
  putLeaveEntriesSuccess,
  putLeaveEntriesFailed
} = leaveEntriesSlice.actions;

export default leaveEntriesSlice.reducer;