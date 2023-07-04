/**
 * @module Saga/Auth
 *
 * @desc Login
 */

import { AnyAction } from '@reduxjs/toolkit';
import { loginService, postForgotPassword, postResetPassword, setNewPasswordEmployee } from '../saga-actions/auth/loginAction';
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
  resetPasswordSuccess,
  employeeSetNewPasswordRequested,
  employeeSetNewPasswordSuccessed,
  employeeSetNewPasswordFailed
} from '@/store/reducers/slice/auth/loginSlice';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { Auth } from '@/types/authentication';
import Router from 'next/router';
import { getMeServices } from '../saga-actions/auth/meAction';
import { meSuccessed } from '@/store/reducers/slice/auth/meSlice';
import { readValidationResponse } from '@/utils/helper';

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
      const roles = profile?.data?.data?.roles;
      if (roles?.includes('Employee')) {
        yield Router.push('/employe/company');
      } else if (roles?.includes('Super Admin')) {
        yield Router.push('/dashboard');
      } else {
        yield Router.push('/company');
      }
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      const errorValidationMessage = err?.response?.data as Services.ValidationResponse;
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: errorMessage?.code || errorValidationMessage?.code,
          message: errorMessage?.message === 'Invalid email and password'
            ? 'Incorrect email address or password'
            : errorValidationMessage?.error
              ? readValidationResponse(errorValidationMessage.error).map(errMessage => errMessage.replace(/"/g, ''))
              : errorMessage?.message === 'incorrect email or password' ? 'Incorrect email address or password' : ''
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

function* fetchForgotPassword(action: AnyAction) {
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
          message: 'Email sent successfully',
          footerMessage: 'Please check your email to reset password'
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

function* fetchSetNewPassword(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(setNewPasswordEmployee, action?.payload);
    if (res.status === 200 || res.status === 201) {
      yield put({ type: employeeSetNewPasswordSuccessed.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: res.data.message
        }
      });
      yield delay(1000);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: 0,
          message: null
        }
      });
      Router.push('/login');
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: employeeSetNewPasswordFailed.toString() });
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

function* loginSaga() {
  yield takeEvery(loginRequested.toString(), fetchAuthenticationLogin);
  yield takeEvery(forgotPasswordRequested.toString(), fetchForgotPassword);
  yield takeEvery(resetPasswordRequested.toString(), fetchResetPassword);
  yield takeEvery(employeeSetNewPasswordRequested.toString(), fetchSetNewPassword);
}

export default loginSaga;
