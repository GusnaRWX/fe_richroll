import { AnyAction } from '@reduxjs/toolkit';
import {
  getPayroll,
  postPayroll,
} from '../saga-actions/payroll/payrollActions';
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import {
  getPayrollRequested,
  getPayrollSuccess,
  getPayrollFailed,
  postPayrollRequested,
  postPayrollSuccess,
  postPayrollFailed
} from '@/store/reducers/slice/payroll/payrollSlice';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';


function* fetchGetPayroll(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getPayroll, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: getPayrollSuccess.toString(),
        payload: {
          data: res?.data?.data
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getPayrollFailed.toString() });
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

function* fetchPostPayroll(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postPayroll, action?.payload);
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: postPayrollSuccess.toString() });
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
      yield put({ type: postPayrollFailed.toString() });
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

function* payrollSaga() {
  yield takeEvery(getPayrollRequested.toString(), fetchGetPayroll);
  yield takeEvery(postPayrollRequested.toString(), fetchPostPayroll);
}

export default payrollSaga;
