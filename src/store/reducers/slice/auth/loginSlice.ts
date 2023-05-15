import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { setStorages } from '@/utils/storage';

interface LoginState {
  isLoading: boolean;
  isAuth: boolean;
}

const initialState: LoginState = {
  isLoading: false,
  isAuth: false
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
  employeeSetNewPasswordFailed
} = loginSlice.actions;

export default loginSlice.reducer;