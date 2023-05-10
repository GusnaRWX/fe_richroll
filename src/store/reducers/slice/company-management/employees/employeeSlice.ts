import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface employeeState {
  isLoading: boolean;
  data: [];
  employeeID: string | number
}

const initialState: employeeState = {
  isLoading: false,
  data: [],
  employeeID: ''
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
  postEmergencySuccess
} = employeeSlice.actions;

export default employeeSlice.reducer;