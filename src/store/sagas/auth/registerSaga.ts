import { AnyAction } from '@reduxjs/toolkit';
import { postRegister, sendEmail } from '../saga-actions/auth/regsiterAction';
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import { registerRequested, registerFailed, registerSuccess, sendEmailRequested, sendEmailFailed, sendEmailSuccess } from '@/store/reducers/slice/auth/registerSlice';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { Auth } from '@/types/authentication';
import Router from 'next/router';
import { readValidationResponse } from '@/utils/helper';

function* fetchPostRegister(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postRegister, action?.payload);
    if (res.status === 201) {
      const { accessToken } = res?.data?.data as Auth.Register;
      yield put({
        type: registerSuccess.toString(), payload: {
          token: accessToken
        }
      });
      const body = {
        type: sendEmailRequested.toString(),
        payload: accessToken
      };
      yield call(fetchSendEmail, body);
      Router.push('/send-email-verification');
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      const errorValidationMessage = err?.response?.data as Services.ValidationResponse;
      yield put({ type: registerFailed.toString() });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: errorMessage?.code,
          message: errorValidationMessage.error.length > 0 ? readValidationResponse(errorValidationMessage.error).map(errorMessage => errorMessage.replace(/"/g, '')) : errorMessage?.message,
        }
      });
    }
  }
}

function* fetchSendEmail(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(sendEmail, action.payload);
    if (res.status === 200) {
      yield put({ type: sendEmailSuccess.toString() });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: sendEmailFailed.toString() });
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

function* registerSaga() {
  yield takeEvery(registerRequested.toString(), fetchPostRegister);
  yield takeEvery(sendEmailRequested.toString(), fetchSendEmail);
}

export default registerSaga;