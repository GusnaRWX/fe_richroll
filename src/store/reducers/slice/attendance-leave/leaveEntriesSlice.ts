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

export const { getLeaveEntriesRequested, getLeaveEntriesSuccess, getLeaveEntriesFailed } = leaveEntriesSlice.actions;

export default leaveEntriesSlice.reducer;