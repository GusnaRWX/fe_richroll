import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState: any = {
  loading: false,
  data: [],
};

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    exampleRequest(state) {
      state.loading = true;
    },
    exampleSuccess(state, action) {
      state.loading = false;
      state.data = action?.payload;
    },
    exampleFailed(state) {
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

export const { exampleRequest, exampleSuccess, exampleFailed } =
  exampleSlice.actions;

export default exampleSlice.reducer;
