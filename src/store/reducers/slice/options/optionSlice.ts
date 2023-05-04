import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface OptionState {
  loading: boolean,
  countries: []
}

const initialState:OptionState = {
  loading: false,
  countries: []
};

export const optionSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    countriesRequested: (state) => {
      state.loading = true;
    },
    countriesSuccess: (state, action) => {
      state.loading = false;
      state.countries = action?.payload?.items;
    },
    countriesFailed: (state) => {
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

export const { countriesRequested, countriesSuccess, countriesFailed } = optionSlice.actions;

export default optionSlice.reducer;