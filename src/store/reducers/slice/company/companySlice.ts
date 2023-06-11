import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface CompanyState {
  loading: boolean,
  companies: [],
  companyType: [],
  companySector: [],
  bank: [],
  paymentMethod: [],
  detail: object,
  companyPayment: object,
}

const initialState: CompanyState = {
  loading: false,
  companies: [],
  companyType: [],
  companySector: [],
  bank: [],
  paymentMethod: [],
  detail: {},
  companyPayment: {}
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
    getCompanyDetailRequested: (state) => {
      state.loading = true;
    },
    getCompanyDetailSuccess: (state, action) => {
      state.loading = false;
      state.detail = action?.payload;
    },
    getCompanyDetailFailed: (state) => {
      state.loading = false;
    },
    postCompanyProfileRequested: (state) => {
      state.loading = true;
    },
    postCompanyProfileSuccess: (state) => {
      state.loading = false;
    },
    postCompanyProfileFailed: (state) => {
      state.loading = false;
    },
    patchCompanyProfileRequested: (state) => {
      state.loading = true;
    },
    patchCompanyProfileSuccess: (state) => {
      state.loading = false;
    },
    patchCompanyProfileFailed: (state) => {
      state.loading = false;
    },
    postCompanyPaymentsRequested: (state) => {
      state.loading = true;
    },
    postCompanyPaymentsSuccess: (state) => {
      state.loading = false;
    },
    postCompanyPaymentsFailed: (state) => {
      state.loading = false;
    },
    patchCompanyPaymentsRequested: (state) => {
      state.loading = true;
    },
    patchCompanyPaymentsSuccess: (state) => {
      state.loading = false;
    },
    patchCompanyPaymentsFailed: (state) => {
      state.loading = false;
    },
    getCompanyProfilePaymentsRequested: (state) => {
      state.loading = true;
    },
    getCompanyProfilePaymentsSuccess: (state, action) => {
      state.loading = false;
      state.companyPayment = action?.payload?.companyPayments;
    },
    getCompanyProfilePaymentsFailed: (state) => {
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
  paymentMethodFailed,
  getCompanyDetailRequested,
  getCompanyDetailSuccess,
  getCompanyDetailFailed,
  postCompanyProfileRequested,
  postCompanyProfileSuccess,
  postCompanyProfileFailed,
  patchCompanyProfileRequested,
  patchCompanyProfileSuccess,
  patchCompanyProfileFailed,
  postCompanyPaymentsRequested,
  postCompanyPaymentsSuccess,
  postCompanyPaymentsFailed,
  patchCompanyPaymentsRequested,
  patchCompanyPaymentsSuccess,
  patchCompanyPaymentsFailed,
  getCompanyProfilePaymentsRequested,
  getCompanyProfilePaymentsSuccess,
  getCompanyProfilePaymentsFailed
} = companySlice.actions;

export default companySlice.reducer;