import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface CnbState {
  loading: boolean;
  dataTable: [];
  compensationComponentOption: [];
}

const initialState: CnbState = {
  loading: false,
  dataTable: [],
  compensationComponentOption: [],
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
} = cnbSlice.actions;

export default cnbSlice.reducer;
