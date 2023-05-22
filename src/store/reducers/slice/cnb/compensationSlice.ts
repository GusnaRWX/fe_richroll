import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface CnbState {
  loading: boolean;
  dataTable: [];
  compensationComponentOption: [];
  rerender: boolean;
}

const initialState: CnbState = {
  loading: false,
  dataTable: [],
  compensationComponentOption: [],
  rerender: false
};

export const cnbSlice = createSlice({
  name: "cnbTable",
  initialState,
  reducers: {
    // Get Table Item
    getTableRequested: (state) => {
      state.loading = true;
    },
    getTableSuccess: (state, action) => {
      state.loading = false;
      state.dataTable = action.payload;
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
    postNewCnbProfileSuccess: (state, action) => {
      state.loading = false;
    },
    postNewCnbProfileFailed: (state) => {
      state.loading = false;
    },

    // Create New CNB Profile
    deleteCompensationRequested: (state) => {
      state.loading = true;
    },
    deleteCompensationSuccess: (state) => {
      state.loading = false;
      state.rerender = !state.rerender
    },
    deleteCompensationFailed: (state) => {
      state.loading = false;
      state.rerender = !state.rerender
    },
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
} = cnbSlice.actions;

export default cnbSlice.reducer;
