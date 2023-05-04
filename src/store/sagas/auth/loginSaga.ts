/**
 * @module Saga/Auth 
 * 
 * @desc Login
 */

import { AnyAction } from '@reduxjs/toolkit';
import { loginService } from '../saga-actions/auth/loginAction';
import { call, put, takeEvery } from 'redux-saga/effects';
import { loginRequested, loginSuccessed } from '@/store/reducers/slice/auth/loginSlice';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { Auth } from '@/types/authentication';
import Router from 'next/router';

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
      yield Router.push('/dashboard');
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
    }
  }
}

function* authSaga() {
  yield takeEvery(loginRequested.toString(), fetchAuthenticationLogin);
}

export default authSaga;