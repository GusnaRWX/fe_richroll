/**
 * @module Saga/Auth
 *
 * @desc Login
 */

import { AnyAction } from '@reduxjs/toolkit';
import { loginService, postForgotPassword, postResetPassword } from '../saga-actions/auth/loginAction';
import { call, delay, put, takeEvery } from 'redux-saga/effects';
import {
  loginRequested,
  loginSuccessed,
  loginFailured,
  forgotPasswordFailed,
  forgotPasswordRequested,
  forgotPasswordSuccess,
  resetPasswordRequested,
  resetPasswordFailed,
  resetPasswordSuccess
} from '@/store/reducers/slice/auth/loginSlice';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { Auth } from '@/types/authentication';
import Router from 'next/router';
import { getMeServices } from '../saga-actions/auth/meAction';
import { meSuccessed } from '@/store/reducers/slice/auth/meSlice';

/**
 * Fetch Authentication (Login)
 *
 * @param action
 */
function* fetchAuthenticationLogin(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(loginService, action?.payload);
    if (res.status === 200) {
      const { accessToken, refreshToken } = res?.data?.data as Auth.Login;
      yield put({
        type: loginSuccessed.toString(), payload: {
          token: accessToken,
          refreshToken: refreshToken
        }
      });
      const profile = yield call(getMeServices);
      yield put({
        type: meSuccessed.toString(),
        payload: { ...profile?.data?.data as Auth.Me }
      });
      yield Router.push('/company');
      yield delay(1000);
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: errorMessage?.code,
          message: errorMessage?.message,
        }
      });
      yield put({ type: loginFailured.toString() });
    }
  }
}

/**
 * Fetch forgot password
 *
 * @param action
 */

function* fetchForgotPassword(action: AnyAction){
  try {
    const res: AxiosResponse = yield call(postForgotPassword, action?.payload);
    if (res.status === 200 || res.status === 201) {
      yield put({
        type: forgotPasswordSuccess.toString(),
        payload: {
          isError: false
        }
      });
      delay(2000);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: res.data.message
        }
      });
      yield delay(2000);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: 0,
          message: null
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: forgotPasswordFailed.toString(), payload: { isError: true } });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: errorMessage?.code,
          message: errorMessage?.message,
        }
      });
    }
  }
}

function* fetchResetPassword(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postResetPassword, action?.payload);
    if (res.status === 200 || res.status === 201) {
      yield put({
        type: resetPasswordSuccess.toString()
      });
      delay(2000);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: res.data.message
        }
      });
      yield delay(2000);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: 0,
          message: null
        }
      });
      yield delay(1000);
      Router.push('/login');
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: resetPasswordFailed.toString() });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: errorMessage?.code,
          message: errorMessage?.message,
        }
      });
    }
  }
}

function* authSaga() {
  yield takeEvery(loginRequested.toString(), fetchAuthenticationLogin);
  yield takeEvery(forgotPasswordRequested.toString(), fetchForgotPassword);
  yield takeEvery(resetPasswordRequested.toString(), fetchResetPassword);
}

export default authSaga;