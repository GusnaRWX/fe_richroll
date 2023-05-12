import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface CompanyState {
  loading: boolean,
  companies: [],
  companyType: [],
  companySector: [],
  bank: [],
  paymentMethod: []
}

const initialState:CompanyState = {
  loading: false,
  companies: [],
  companyType: [],
  companySector: [],
  bank: [],
  paymentMethod: []
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    companiesRequested: (state) => {
      state.loading = true;
    },
    companiesSuccess: (state, action) => {
      state.loading = false;
      state.companies = action?.payload?.items;
    },
    companiesFailed: (state) => {
      state.loading = false;
    },
    companyTypeRequested: (state) => {
      state.loading = true;
    },
    companyTypeSuccess: (state, action) => {
      state.loading = false;
      state.companyType = action?.payload?.items;
    },
    companyTypeFailed: (state) => {
      state.loading = false;
    },
    companySectorRequested: (state) => {
      state.loading = true;
    },
    companySectorSuccess: (state, action) => {
      state.loading = false;
      state.companySector = action?.payload?.items;
    },
    companySectorFailed: (state) => {
      state.loading = false;
    },
    bankRequested: (state) => {
      state.loading = true;
    },
    bankSuccess: (state, action) => {
      state.loading = false;
      state.bank = action?.payload?.items;
    },
    bankFailed: (state) => {
      state.loading = false;
    },
    paymentMethodRequested: (state) => {
      state.loading = true;
    },
    paymentMethodSuccess: (state, action) => {
      state.loading = false;
      state.paymentMethod = action?.payload?.items;
    },
    paymentMethodFailed: (state) => {
      state.loading = false;
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
  companiesRequested,
  companiesSuccess,
  companiesFailed,
  companyTypeRequested,
  companyTypeSuccess,
  companyTypeFailed,
  companySectorRequested,
  companySectorSuccess,
  companySectorFailed,
  bankRequested,
  bankSuccess,
  bankFailed,
  paymentMethodRequested,
  paymentMethodSuccess,
  paymentMethodFailed
} = companySlice.actions;

export default companySlice.reducer;