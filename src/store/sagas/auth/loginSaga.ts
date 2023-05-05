/**
 * @module Saga/Auth 
 * 
 * @desc Login
 */

import { AnyAction } from '@reduxjs/toolkit';
import { loginService } from '../saga-actions/auth/loginAction';
import { call, delay, put, takeEvery } from 'redux-saga/effects';
import { loginRequested, loginSuccessed, loginFailured } from '@/store/reducers/slice/auth/loginSlice';
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
      console.log(profile);
      yield put({
        type: meSuccessed.toString(),
        payload: { ...profile?.data?.data as Auth.Me }
      });
      yield Router.push('/dashboard');
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

function* authSaga() {
  yield takeEvery(loginRequested.toString(), fetchAuthenticationLogin);
}

export default authSaga;