import { AnyAction } from '@reduxjs/toolkit';
import {
  getAttendanceEntries,
  postAttendanceEntries,
  putAttendanceEntries,
  delAttendanceEntries
} from '../saga-actions/attendance-leave/attendanceEntriesActions';
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import {
  getAttendanceRequested,
  getAttendanceSuccess,
  getAttendanceFailed,
  postAttendanceRequested,
  postAttendanceSuccess,
  postAttendanceFailed,
  putAttendanceRequested,
  putAttendanceSuccess,
  putAttendanceFailed,
  deleteAttendanceRequested,
  deleteAttendanceSuccess,
  deleteAttendanceFailed
} from '@/store/reducers/slice/attendance-leave/attendanceEntriesSlice';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';


function* fetchGetAttendanceEntries(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getAttendanceEntries, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: getAttendanceSuccess.toString(),
        payload: {
          data: res?.data?.data
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getAttendanceFailed.toString() });
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

function* fetchPostAttendanceEntries(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postAttendanceEntries, action?.payload);
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: postAttendanceSuccess.toString() });
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
      yield put({ type: postAttendanceFailed.toString() });
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

function* fetchPutAttendanceEntries(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(putAttendanceEntries, action?.payload);
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: putAttendanceSuccess.toString() });
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
      yield put({ type: putAttendanceFailed.toString() });
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

function* fetchDelAttendanceEntries(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(delAttendanceEntries, action?.payload);
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: deleteAttendanceSuccess.toString() });
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
      yield put({ type: deleteAttendanceFailed.toString() });
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

function* attendanceEntriesSaga() {
  yield takeEvery(getAttendanceRequested.toString(), fetchGetAttendanceEntries);
  yield takeEvery(postAttendanceRequested.toString(), fetchPostAttendanceEntries);
  yield takeEvery(putAttendanceRequested.toString(), fetchPutAttendanceEntries);
  yield takeEvery(deleteAttendanceRequested.toString(), fetchDelAttendanceEntries);
}

export default attendanceEntriesSaga;
