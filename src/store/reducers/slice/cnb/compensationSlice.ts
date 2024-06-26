import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface CnbState {
  loading: boolean;
  dataTable: [];
  compensationComponentOption: [];
  rerender: boolean;
  detail: [];
  detailLoading: boolean;
  resetAll: object
}

const initialState: CnbState = {
  loading: false,
  dataTable: [],
  compensationComponentOption: [],
  rerender: false,
  detail: [],
  detailLoading: false,
  resetAll: {}
};

export const cnbSlice = createSlice({
  name: 'cnbTable',
  initialState,
  reducers: {
    // Get Table Item
    getTableRequested: (state) => {
      state.loading = true;
    },
    getTableSuccess: (state, action) => {
      state.loading = false;
      state.dataTable = action?.payload?.data;
    },
    getTableFailed: (state) => {
      state.loading = false;
    },

    // Get Option Compensation Component
    getCompensationComponentOptionRequested: (state) => {
      state.loading = true;
    },
    getCompensationComponentOptionSuccess: (state, action) => {
      state.loading = false;
      state.compensationComponentOption = action.payload;
    },
    getCompensationComponentOptionFailed: (state) => {
      state.loading = false;
    },

    // Create New CNB Profile
    postNewCnbProfileRequested: (state) => {
      state.loading = true;
    },
    postNewCnbProfileSuccess: (state, _action) => {
      state.loading = false;
    },
    postNewCnbProfileFailed: (state) => {
      state.loading = false;
    },

    // Delete CNB Profile
    deleteCompensationRequested: (state) => {
      state.loading = true;
    },
    deleteCompensationSuccess: (state) => {
      state.loading = false;
      state.rerender = !state.rerender;
    },
    deleteCompensationFailed: (state) => {
      state.loading = false;
      state.rerender = !state.rerender;
    },

    // Delete CNB Profile
    getDetailRequested: (state) => {
      state.detailLoading = true;
    },
    getDetailSuccess: (state, action) => {
      state.detailLoading = false;
      state.detail = action.payload;
    },
    getDetailFailed: (state) => {
      state.detailLoading = false;
    },

    // Update CNB Profile
    putUpdateRequested: (state) => {
      state.detailLoading = true;
    },
    putUpdateSuccess: (state, _action) => {
      state.detailLoading = false;
    },
    putUpdateFailed: (state) => {
      state.detailLoading = false;
    },

    resetAllState: (state) => {
      // state.loading = false;
      // state.dataTable = [];
      // state.compensationComponentOption = [];
      // state.rerender = false;
      state.detail = [];
      state.detailLoading = false;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  getTableRequested,
  getTableSuccess,
  getTableFailed,
  getCompensationComponentOptionRequested,
  getCompensationComponentOptionSuccess,
  getCompensationComponentOptionFailed,
  postNewCnbProfileRequested,
  postNewCnbProfileSuccess,
  postNewCnbProfileFailed,
  deleteCompensationRequested,
  deleteCompensationSuccess,
  deleteCompensationFailed,
  getDetailRequested,
  getDetailSuccess,
  getDetailFailed,
  putUpdateRequested,
  putUpdateSuccess,
  putUpdateFailed,
  resetAllState
} = cnbSlice.actions;

export default cnbSlice.reducer;
