import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { Payroll } from '@/types/payroll';

interface AccountState {
  isLoading: boolean;
  data: Array<Payroll.PayrollType>;
}

const initialState: AccountState = {
  isLoading: false,
  data: [],
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
    postPayrollSuccess: (state) => {
      state.isLoading = false;
    },
    postPayrollFailed: (state) => {
      state.isLoading = false;
    },
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
  postPayrollFailed
} = payrollSlice.actions;

export default payrollSlice.reducer;