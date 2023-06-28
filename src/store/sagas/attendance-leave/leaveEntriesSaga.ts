import { AnyAction } from '@reduxjs/toolkit';
import { getLeaveEntries } from '../saga-actions/attendance-leave/leaveEntriesAction';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getLeaveEntriesRequested, getLeaveEntriesSuccess, getLeaveEntriesFailed } from '@/store/reducers/slice/attendance-leave/leaveEntriesSlice';
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

function* leaveEntriesSaga() {
  yield takeEvery(getLeaveEntriesRequested.toString(), fetchGetLeaveEntries);
}

export default leaveEntriesSaga;