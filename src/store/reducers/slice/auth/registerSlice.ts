import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface RegisterState {
  loading: boolean
}

const initialState: RegisterState = {
  loading: false
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerRequested: (state) => {
      state.loading = true;
    },
    registerSuccess: (state) => {
      state.loading = true;
    },
    registerFailed: (state) => {
      state.loading = false;
    },
    sendEmailRequested: (state) => {
      state.loading = true;
    },
    sendEmailSuccess: (state) => {
      state.loading = false;
    },
    sendEmailFailed: (state) => {
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

export const { registerRequested, registerFailed, registerSuccess, sendEmailRequested, sendEmailSuccess, sendEmailFailed } = registerSlice.actions;

export default registerSlice.reducer;