import { AnyAction } from '@reduxjs/toolkit';
import {
  getAccount,
  patchSuspensionAccount,
  putDeleteAccount,
  putReactivateAccount,
  putEmployeeAccountDeletion,
  postUserSuspend
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
  putAccountReactiveFailed,
  putEmployeeAccountDeletionFailed,
  putEmployeeAccountDeletionRequested,
  putEmployeeAccountDeletionSuccess,
  postUserSuspendRequested,
  postUserSuspendSuccess,
  postUserSupendFailed
} from '@/store/reducers/slice/account-management/accountManagementSlice';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { clearStorages } from '@/utils/storage';
import Router from 'next/router';


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
    const res: AxiosResponse = yield call(patchSuspensionAccount, action?.payload?.data);
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: patchAccountSuspensionSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: 'Successfully Suspended Account',
          footerMessage: `Account ${action?.payload?.accountName} is suspended successfully`
        }
      });
    }
  } catch (err) {
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
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: putAccountDeleteSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: res?.data?.message
        }
      });
    }
  } catch (err) {
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
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: putAccountReactiveSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: res?.data?.message
        }
      });
    }
  } catch (err) {
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

function* fetchPutEmployeeDeletion(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(putEmployeeAccountDeletion, action?.payload);
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: putEmployeeAccountDeletionSuccess.toString() });
      clearStorages(['accessToken', 'refreshToken', 'user']);
      Router.push('/login');
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: res?.data?.message
        }
      });

    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({
        type: putEmployeeAccountDeletionFailed.toString(), payload: {
          code: errorMessage?.code
        }
      });
      yield delay(2000, true);
      if (errorMessage?.code !== 409) {
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
}

function* fetchPostUserSuspend(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postUserSuspend, action?.payload);

    if (res.data.code === 201 || res.data.code === 200) {
      yield put({ type: postUserSuspendSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: res?.data?.message
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postUserSupendFailed.toString() });
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
  yield takeEvery(putEmployeeAccountDeletionRequested.toString(), fetchPutEmployeeDeletion);
  yield takeEvery(postUserSuspendRequested.toString(), fetchPostUserSuspend);
}

export default accountSaga;
