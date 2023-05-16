import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface CnbState {
  loading: boolean;
  dataTable: [];
}

const initialState: CnbState = {
  loading: false,
  dataTable: [],
};

export const cnbSlice = createSlice({
  name: "cnbTable",
  initialState,
  reducers: {
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

export const { getTableRequested, getTableSuccess, getTableFailed } =
  cnbSlice.actions;

export default cnbSlice.reducer;
