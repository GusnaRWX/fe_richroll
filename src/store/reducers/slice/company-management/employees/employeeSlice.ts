import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface employeeState {
  isLoading: boolean;
  data: [];
}

const initialState: employeeState = {
  isLoading: false,
  data: []
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    getEmployeeRequested: (state) => {
      state.isLoading = true;
    },
    getEmployeeSuccess: (state, action)=> {
      state.isLoading = false,
      state.data = action.payload.data;
    },
    getEmployeeFailed: (state) => {
      state.isLoading = false;
    },
    postEmployeeInfoRequested: (state) => {
      state.isLoading = true;
    },
    postEmployeeInfoSuccess: (state) => {
      state.isLoading = false;
    },
    postEmployeeInfoFailed: (state) => {
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
  postEmployeeInfoFailed
} = employeeSlice.actions;

export default employeeSlice.reducer;