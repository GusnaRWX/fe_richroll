import { AnyAction } from '@reduxjs/toolkit';
import { getLeaveEntries, postLeaveEntries, deleteLeaveEntries, putLeaveEntries } from '../saga-actions/attendance-leave/leaveEntriesAction';
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import {
  getLeaveEntriesRequested,
  getLeaveEntriesSuccess,
  getLeaveEntriesFailed,
  postLeaveEntriesRequested,
  postLeaveEntriesSuccess,
  postLeaveEntriesFailed,
  deleteLeaveEntriesRequested,
  deleteLeaveEntriesSuccess,
  deleteLeaveEntriesFailed,
  putLeaveEntriesRequested,
  putLeaveEntriesSuccess,
  putLeaveEntriesFailed
} from '@/store/reducers/slice/attendance-leave/leaveEntriesSlice';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';

function* fetchGetLeaveEntries(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getLeaveEntries, action?.payload);
    yield put({
      type: getLeaveEntriesSuccess.toString(),
      payload: res.data.data
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getLeaveEntriesFailed.toString() });
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

function* fetchPostLeaveEntries(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postLeaveEntries, action?.payload);
    if (res.status === 201) {
      yield put({ type: postLeaveEntriesSuccess.toString() });
      yield put({
        type: setResponserMessage?.toString(),
        payload: {
          code: res?.data?.code,
          message: 'Leave Entry Created!',
          footerMessage: 'New Data Entry has been created'
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
      yield call(fetchGetLeaveEntries, action);
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postLeaveEntriesFailed.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: errorMessage?.code,
          message: errorMessage?.message
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
  }
}

function* fetchDeleteLeaveEntries(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(deleteLeaveEntries, action?.payload);
    if (res.status === 200) {
      yield put({ type: deleteLeaveEntriesSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: 'Leave Entry Deleted',
          footerMessage: 'Data Entry has been Deleted Successfully'
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
      yield call(fetchGetLeaveEntries, action);
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: deleteLeaveEntriesFailed.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: errorMessage?.code,
          message: errorMessage?.message
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
  }
}

function* fetchPutLeaveEntries(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(putLeaveEntries, action?.payload);
    if (res.status === 200) {
      yield put({ type: putLeaveEntriesSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: 'Leave Entry Updated',
          footerMessage: 'Data Entry has been Updated Successfully'
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
      yield call(fetchGetLeaveEntries, action);
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: putLeaveEntriesFailed.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: errorMessage?.code,
          message: errorMessage?.message
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
  }
}

function* leaveEntriesSaga() {
  yield takeEvery(getLeaveEntriesRequested.toString(), fetchGetLeaveEntries);
  yield takeEvery(postLeaveEntriesRequested.toString(), fetchPostLeaveEntries);
  yield takeEvery(deleteLeaveEntriesRequested.toString(), fetchDeleteLeaveEntries);
  yield takeEvery(putLeaveEntriesRequested.toString(), fetchPutLeaveEntries);
}

export default leaveEntriesSaga;