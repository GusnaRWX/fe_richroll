import { AnyAction } from '@reduxjs/toolkit';
import {
  getDataTable,
  getCompensationComponentOption,
  postNewCnbProfile,
  deleteCnbProfile,
} from '../saga-actions/cnb/compensationActions';
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import {
  getTableRequested,
  getTableSuccess,
  getTableFailed,
  getCompensationComponentOptionRequested,
  getCompensationComponentOptionSuccess,
  getCompensationComponentOptionFailed,
  postNewCnbProfileRequested,
  postNewCnbProfileSuccess,
  postNewCnbProfileFailed,
  deleteCompensationRequested,
  deleteCompensationSuccess,
  deleteCompensationFailed,
} from '@/store/reducers/slice/cnb/compensationSlice';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';
import Router from 'next/router';

// Get Data Table
function* fetchGetTable(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getDataTable, action?.payload);
    if (res.status === 200) {
      yield put({
        type: getTableSuccess.toString(),
        payload: {
          data: res.data.data,
        },
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getTableFailed.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: errorMessage?.code,
          message: errorMessage?.message,
        },
      });
    }
  }
}

// Get Compensation Component Option For Input
function* fetchGetCompensationComponentOption() {
  try {
    const res: AxiosResponse = yield call(getCompensationComponentOption);
    if (res.status === 200) {
      yield put({
        type: getCompensationComponentOptionSuccess.toString(),
        payload: {
          data: res.data.data,
        },
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getCompensationComponentOptionFailed.toString() });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: errorMessage?.code,
          message: errorMessage?.message,
        },
      });
    }
  }
}

// delete compensation benefit
function* deleteCnb(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(deleteCnbProfile, action?.Id);
    if (res.status === 200) {
      yield put({
        type: deleteCompensationSuccess.toString(),
        payload: {
          data: res.data.data,
        },
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: deleteCompensationFailed.toString() });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: errorMessage?.code,
          message: errorMessage?.message,
        },
      });
    }
  }
}

function* fetchPostNewCnbProfile(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postNewCnbProfile, action?.Payload);
    if (res.status === 200) {
      yield put({
        type: postNewCnbProfileSuccess.toString(),
        payload: {
          data: res.data.data,
        },
      });
      yield Router.push('/compensation-benefits');
      yield delay(1000);
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postNewCnbProfileFailed.toString() });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: errorMessage?.code,
          message: errorMessage?.message,
        },
      });
    }
  }
}

function* compensationSaga() {
  yield takeEvery(getTableRequested.toString(), fetchGetTable);
  yield takeEvery(
    getCompensationComponentOptionRequested.toString(),
    fetchGetCompensationComponentOption
  );
  yield takeEvery(
    postNewCnbProfileRequested.toString(),
    fetchPostNewCnbProfile
  );
  yield takeEvery(deleteCompensationRequested.toString(), deleteCnb);
}

export default compensationSaga;
