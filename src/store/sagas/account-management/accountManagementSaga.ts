import { AnyAction } from '@reduxjs/toolkit';
import {
  getAccount,
  patchSuspensionAccount,
  putDeleteAccount,
  putReactivateAccount
} from '../saga-actions/account-management/accountManagementActions';
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import {
  getAccountRequested,
  getAccountSuccess,
  getAccountFailed,
  patchAccountSuspensionRequested,
  patchAccountSuspensionSuccess,
  patchAccountSuspensionFailed,
  putAccountDeleteRequested,
  putAccountDeleteSuccess,
  putAccountDeleteFailed,
  putAccountReactiveRequested,
  putAccountReactiveSuccess,
  putAccountReactiveFailed
} from '@/store/reducers/slice/account-management/accountManagementSlice';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';


function* fetchGetAccount(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getAccount, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: getAccountSuccess.toString(),
        payload: {
          data: res?.data?.data
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getAccountFailed.toString() });
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

function* fetchPatchSuspensionAccount(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(patchSuspensionAccount, action?.payload);
    if (res.data.code === '200' || res.data.code === '201') {
      yield put({ type: patchAccountSuspensionSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: res?.data?.message
        }
      });
    }
  } catch(err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: patchAccountSuspensionFailed.toString() });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: errorMessage?.code,
          message: errorMessage?.message
        }
      });
    }
  }
}

function* fetchPutDeleteAccount(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(putDeleteAccount, action?.payload);
    if (res.data.code === '200' || res.data.code === '201') {
      yield put({ type: putAccountDeleteSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: res?.data?.message
        }
      });
    }
  } catch(err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: putAccountDeleteFailed.toString() });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: errorMessage?.code,
          message: errorMessage?.message
        }
      });
    }
  }
}

function* fetchPutReactivateAccount(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(putReactivateAccount, action?.payload);
    if (res.data.code === '200' || res.data.code === '201') {
      yield put({ type: putAccountReactiveSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: res?.data?.message
        }
      });
    }
  } catch(err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: putAccountReactiveFailed.toString() });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: errorMessage?.code,
          message: errorMessage?.message
        }
      });
    }
  }
}

function* accountSaga() {
  yield takeEvery(getAccountRequested.toString(), fetchGetAccount);
  yield takeEvery(patchAccountSuspensionRequested.toString(), fetchPatchSuspensionAccount);
  yield takeEvery(putAccountDeleteRequested.toString(), fetchPutDeleteAccount);
  yield takeEvery(putAccountReactiveRequested.toString(), fetchPutReactivateAccount);
}

export default accountSaga;
