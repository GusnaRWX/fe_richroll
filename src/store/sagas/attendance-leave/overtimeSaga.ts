import { AnyAction } from '@reduxjs/toolkit';
import {
  getOvertime,
  postOvertime,
  putOvertime,
  deleteOvertime
} from '../saga-actions/attendance-leave/overtimeActions';
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import {
  getOvertimeRequested,
  getOvertimeFailed,
  getOvertimeSuccess,
  postOvertimeRequested,
  postOvertimeFailed,
  postOvertimeSuccess,
  putOvertimeFailed,
  putOvertimeRequested,
  putOvertimeSuccess,
  deleteOvertimeFailed,
  deleteOvertimeRequested,
  deleteOvertimeSuccess
} from '@/store/reducers/slice/attendance-leave/overtimeSlice';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosResponse, AxiosError } from 'axios';
import { getCompanyData } from '@/utils/helper';

function* fetchGetOvertime(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getOvertime, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: getOvertimeSuccess.toString(),
        payload: {
          data: res?.data?.data
        }
      });
    }
  } catch(err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getOvertimeFailed.toString() });
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

function* fetchPostOvertime(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postOvertime, action?.payload);
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: postOvertimeSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: res?.data?.message
        }
      });
    }
  }catch(err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postOvertimeFailed.toString() });
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

function* fetchPutOvertime(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(putOvertime, action?.payload);
    if (res.data.code ===200 || res.data.code === 201) {
      yield put({ type: putOvertimeSuccess.toString() });
      yield put({ type: getOvertimeRequested.toString(),
        payload: {
          page: 1,
          itemPerPage: 5,
          sort: '',
          direction: 'DESC',
          search: '',
          companyID: getCompanyData()?.id
        }
      });
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
      yield put({ type: putOvertimeFailed.toString() });
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

function* fetchDeleteOvertime(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(deleteOvertime, action?.payload);
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: deleteOvertimeSuccess.toString() });
      yield put({ type: getOvertimeRequested.toString(),
        payload: {
          page: 1,
          itemPerPage: 5,
          sort: '',
          direction: 'DESC',
          search: '',
          companyID: getCompanyData()?.id
        }
      });
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
      yield put({ type: deleteOvertimeFailed.toString() });
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

function* overtimeSaga() {
  yield takeEvery(getOvertimeRequested.toString(), fetchGetOvertime);
  yield takeEvery(postOvertimeRequested.toString(), fetchPostOvertime);
  yield takeEvery(putOvertimeRequested.toString(), fetchPutOvertime);
  yield takeEvery(deleteOvertimeRequested.toString(), fetchDeleteOvertime);
}

export default overtimeSaga;