import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { Payroll } from '@/types/payroll';

interface AccountState {
  isLoading: boolean;
  data: Array<Payroll.PayrollType>;
  id: string | number;
  name: string;
  start: string;
  end: string;
  workflow: number;
  selectedEmployee: [];
}

const initialState: AccountState = {
  isLoading: false,
  data: [],
  id: '',
  name: '',
  start: '',
  end: '',
  workflow: 0,
  selectedEmployee: []
};

export const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {
    getPayrollRequested: (state) => {
      state.isLoading = true;
    },
    getPayrollSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action?.payload.data;
    },
    getPayrollFailed: (state) => {
      state.isLoading = false;
    },
    postPayrollRequested: (state) => {
      state.isLoading = true;
    },
    postPayrollSuccess: (state, action) => {
      state.isLoading = false;
      state.id = action?.payload;
    },
    postPayrollFailed: (state) => {
      state.isLoading = false;
    },
    getDetailPayrollRequested: (state) => {
      state.isLoading = true;
    },
    getDetailPayrollSuccess: (state, action) => {
      state.isLoading = false;
      state.id = action?.payload?.id;
      state.name = action?.payload?.name;
      state.start = action?.payload?.start;
      state.end = action?.payload?.end;
      state.workflow = action?.payload?.workflow;
    },
    getDetailPayrollFailed: (state) => {
      state.isLoading = false;
    },
    postPayrollAttendanceRequested: (state) => {
      state.isLoading = true;
    },
    postPayrollAttendanceSuccess: (state) => {
      state.isLoading = false;
    },
    postPayrollAttendanceFailed: (state) => {
      state.isLoading = false;
    },
    postSelectedEmployeeRequested: (state) => {
      state.isLoading = true;
    },
    postSelectedEmployeeSuccess: (state) => {
      state.isLoading = false;
    },
    postSelectedEmployeeFailed: (state) => {
      state.isLoading = false;
    },
    getSelectedEmployeeRequested: (state) => {
      state.isLoading = true;
    },
    getSelectedEmployeeSuccess: (state, action) => {
      state.isLoading = false;
      state.selectedEmployee = action?.payload?.data;
    },
    getSelectedEmployeeFailed: (state) => {
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
  getPayrollRequested,
  getPayrollSuccess,
  getPayrollFailed,
  postPayrollRequested,
  postPayrollSuccess,
  postPayrollFailed,
  postPayrollAttendanceFailed,
  postPayrollAttendanceRequested,
  postPayrollAttendanceSuccess,
  getDetailPayrollFailed,
  getDetailPayrollRequested,
  getDetailPayrollSuccess,
  postSelectedEmployeeFailed,
  postSelectedEmployeeRequested,
  postSelectedEmployeeSuccess,
  getSelectedEmployeeFailed,
  getSelectedEmployeeRequested,
  getSelectedEmployeeSuccess
} = payrollSlice.actions;

export default payrollSlice.reducer;