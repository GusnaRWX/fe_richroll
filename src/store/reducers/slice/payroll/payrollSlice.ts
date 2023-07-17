import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { Payroll } from '@/types/payroll';

interface AccountState {
  isLoading: boolean;
  data: Array<Payroll.PayrollType>;
  generateGrossPayroll: []
  id: string | number;
  name: string;
  start: string;
  end: string;
  workflow: number;
  selectedEmployee: [];
  grossesId: string | number;
  grossesEmployee: [],
  grossesEmployeeDetail: Payroll.DataGrossEmployeeDetail | unknown
}

const initialState: AccountState = {
  isLoading: false,
  data: [],
  generateGrossPayroll: [],
  id: '',
  name: '',
  start: '',
  end: '',
  workflow: 0,
  selectedEmployee: [],
  grossesId: '',
  grossesEmployee: [],
  grossesEmployeeDetail: {}
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
    getGenerateGrossPayrollRequested: state => {
      state.isLoading = true;
    },
    getGenerateGrossPayrollSuccess: (state, action) => {
      state.isLoading = false;
      state.generateGrossPayroll = action.payload?.data;
    },
    getGenerateGrossPayrollFailed: state => { state.isLoading = false; },
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
    },
    postPayrollGrossesRequested: state => {
      state.isLoading = true;
    },
    postPayrollGrossesSuccess: (state, action) => {
      state.isLoading = false;
      state.grossesId = action.payload.data;
    },
    postPayrollGrossesFailed: state => {
      state.isLoading = false;
    },
    getGenerateGrossesEmployeeRequested: state => {
      state.isLoading = true;
    },
    getGenerateGrossesEmployeeSuccess: (state, action) => {
      state.isLoading = false;
      state.grossesEmployee = action?.payload?.data;
    },
    getGenerateGrossesEmployeeFailed: state => {
      state.isLoading = false;
    },
    putGenerateGrossesEmployeeRequested: state => {
      state.isLoading = true;
    },
    putGenerateGrossesEmployeeSuccess: state => {
      state.isLoading = false;
    },
    putGenerateGrossesEmployeeFailed: state => {
      state.isLoading = false;
    },
    getPayrollGrossesRequested: state => {
      state.isLoading = true;
    },
    getPayrollGrossesSuccess: (state, action) => {
      state.isLoading = false;
      state.grossesEmployeeDetail = action?.payload?.data;
    },
    getPayrollGrossesFailed: state => {
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
  getGenerateGrossPayrollRequested,
  getGenerateGrossPayrollSuccess,
  getGenerateGrossPayrollFailed,
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
  getSelectedEmployeeSuccess,
  postPayrollGrossesRequested,
  postPayrollGrossesSuccess,
  postPayrollGrossesFailed,
  getGenerateGrossesEmployeeRequested,
  getGenerateGrossesEmployeeSuccess,
  getGenerateGrossesEmployeeFailed,
  putGenerateGrossesEmployeeRequested,
  putGenerateGrossesEmployeeSuccess,
  putGenerateGrossesEmployeeFailed,
  getPayrollGrossesRequested,
  getPayrollGrossesSuccess,
  getPayrollGrossesFailed
} = payrollSlice.actions;

export default payrollSlice.reducer;