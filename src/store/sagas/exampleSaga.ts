import { AnyAction } from '@reduxjs/toolkit';
import { call, delay, put, takeEvery } from 'redux-saga/effects';
import {
  exampleRequest,
  exampleSuccess,
  exampleFailed,
} from '../reducers/slice/exampleSlice';
import { setResponserMessage } from '../reducers/slice/responserSlice';
import { getExample } from './saga-actions/exampleActions';

function* fetchExample(action: AnyAction) {
  try {
    const res: string = yield call(getExample, action.payload);
    yield put({ type: exampleSuccess.toString(), payload: res });
  } catch (err) {
    yield delay(2000, true);
    yield put({ type: exampleFailed.toString() });
    yield put({
      type: exampleFailed.toString(),
      payload: { code: 400, message: err },
    });
    yield delay(3000, true);
    yield put({
      type: setResponserMessage.toString(),
      payload: { code: 0, message: null },
    });
  }
}

function* exampleSaga() {
  yield takeEvery(exampleRequest.toString(), fetchExample);
}

export default exampleSaga;
