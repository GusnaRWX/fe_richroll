import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface CompanyState {
  loading: boolean,
  companies: [],
  companyType: [],
  companySector: [],
  bank: [],
  paymentMethod: [],
  detail: object
}

const initialState:CompanyState = {
  loading: false,
  companies: [],
  companyType: [],
  companySector: [],
  bank: [],
  paymentMethod: [],
  detail: {}
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
    postCompanyDetailRequested: (state) => {
      state.loading = true;
    },
    postCompanyDetailSuccess: (state, action) => {
      state.loading = false;
      state.detail = action?.payload;
    },
    postCompanyDetailFailed: (state) => {
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
  postCompanyDetailRequested,
  postCompanyDetailSuccess,
  postCompanyDetailFailed,
  postCompanyProfileRequested,
  postCompanyProfileSuccess,
  postCompanyProfileFailed,
  patchCompanyProfileRequested,
  patchCompanyProfileSuccess,
  patchCompanyProfileFailed
} = companySlice.actions;

export default companySlice.reducer;