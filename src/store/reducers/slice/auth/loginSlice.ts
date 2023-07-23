import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { setStorages, getStorage } from '@/utils/storage';

interface LoginState {
  isLoading: boolean;
  isAuth: boolean;
  isError: boolean;
}

const initialState: LoginState = {
  isLoading: false,
  isAuth: false,
  isError: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginRequested: (state) => {
      state.isAuth = false;
      state.isLoading = true;
    },
    loginSuccessed: (state, action) => {
      setStorages([
        { name: 'accessToken', value: action.payload.token },
        { name: 'refreshToken', value: action.payload.refreshToken }]);
      if (!getStorage('site')) setStorages([{ name: 'site', value: 'Indonesia' }]);
      if (!getStorage('timezone')) setStorages([{ name: 'timezone', value: 'Asia/Jakarta' }]);
      state.isAuth = true;
      state.isLoading = false;
    },
    loginFailured: (state) => {
      state.isAuth = false;
      state.isLoading = false;
    },
    employeeSetNewPasswordRequested: (state) => {
      state.isLoading = true;
    },
    employeeSetNewPasswordSuccessed: (state) => {
      state.isLoading = false;
    },
    employeeSetNewPasswordFailed: (state) => {
      state.isLoading = false;
    },
    forgotPasswordRequested: (state) => {
      state.isLoading = true;
    },
    forgotPasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.isError;
    },
    forgotPasswordFailed: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.isError;
    },
    resetPasswordRequested: (state) => {
      state.isLoading = true;
    },
    resetPasswordSuccess: (state) => {
      state.isLoading = false;
    },
    resetPasswordFailed: (state) => {
      state.isLoading = false;
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
  loginRequested,
  loginSuccessed,
  loginFailured,
  employeeSetNewPasswordRequested,
  employeeSetNewPasswordSuccessed,
  employeeSetNewPasswordFailed,
  forgotPasswordRequested,
  forgotPasswordFailed,
  forgotPasswordSuccess,
  resetPasswordRequested,
  resetPasswordFailed,
  resetPasswordSuccess
} = loginSlice.actions;

export default loginSlice.reducer;