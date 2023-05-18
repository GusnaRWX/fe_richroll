import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface EmployeeState {
  isLoading: boolean;
  data: [];
  employeeID: string | number;
  employeeInformationDetail: object;
  personalInformationDetail: object;
}

const initialState: EmployeeState = {
  isLoading: false,
  data: [],
  employeeID: '',
  employeeInformationDetail: {},
  personalInformationDetail: {}
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
  personalInfoDetailSuccess
} = employeeSlice.actions;

export default employeeSlice.reducer;