import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface EmployeeState {
  isLoading: boolean;
  data: [];
  employeeID: string | number;
  employeeInformationDetail: object;
  personalInformationDetail: object;
  detailCnb: object;
  cnbInformationDetail: object;
}

const initialState: EmployeeState = {
  isLoading: false,
  data: [],
  employeeID: '',
  employeeInformationDetail: {},
  personalInformationDetail: {},
  detailCnb: {},
  cnbInformationDetail: {}
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
    },
    getDetailCnbRequested: (state) => {
      state.isLoading = true;
    },
    getDetailCnbSuccess: (state, action) => {
      state.isLoading = false;
      state.detailCnb = action?.payload?.data;
    },
    getDetailCnbFailed: (state) => {
      state.isLoading = false;
    },
    postCnbEmplyeeRequested: (state) => {
      state.isLoading = true;
    },
    postCnbEmployeeSuccess: (state) => {
      state.isLoading = false;
    },
    postCnbEmployeeFailed: (state) => {
      state.isLoading = false;
    },
    cnbInformationDetailRequested: (state) => {
      state.isLoading = true;
    },
    cnbInformationDetailSuccess: (state, action) => {
      state.isLoading = false;
      state.cnbInformationDetail = action?.payload?.data;
    },
    cnbInformationDetailFailed: (state) => {
      state.isLoading = false;
    },
    patchEmployeeInformationRequested: (state) => {
      state.isLoading = true;
    },
    patchEmployeeInformationSuccess: (state) => {
      state.isLoading = false;
    },
    patchEmployeeInformationFailed: (state) => {
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
  personalInfoDetailSuccess,
  getDetailCnbFailed,
  getDetailCnbRequested,
  getDetailCnbSuccess,
  postCnbEmplyeeRequested,
  postCnbEmployeeSuccess,
  postCnbEmployeeFailed,
  cnbInformationDetailRequested,
  cnbInformationDetailSuccess,
  cnbInformationDetailFailed,
  patchEmployeeInformationRequested,
  patchEmployeeInformationSuccess,
  patchEmployeeInformationFailed
} = employeeSlice.actions;

export default employeeSlice.reducer;