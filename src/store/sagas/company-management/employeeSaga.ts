import { AnyAction } from '@reduxjs/toolkit';
import { getEmployee, postEmployeeInfo } from '../saga-actions/company-management/employeeActions';
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import {
  getEmployeeRequested,
  getEmployeeSuccess,
  getEmployeeFailed,
  postEmployeeInfoRequested,
  postEmployeeInfoSuccess,
  postEmployeeInfoFailed
} from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';


function* fetchGetEmployee(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getEmployee, action?.payload);
    if (res.status === 200) {
      yield put({
        type: getEmployeeSuccess.toString,
        payload: {
          data: res.data.data
        }
      });
    }
  }catch(err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getEmployeeFailed.toString() });
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

function* fetchPostEmployeeInfo(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postEmployeeInfo, action?.payload);
    if (res.status === 201) {
      yield put({ type: postEmployeeInfoSuccess.toString() });
      yield delay(2000);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.status,
          message: res.data.message
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
  }catch(err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postEmployeeInfoFailed.toString() });
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

function* employeeSaga() {
  yield takeEvery(getEmployeeRequested.toString(), fetchGetEmployee);
  yield takeEvery(postEmployeeInfoRequested.toString(), fetchPostEmployeeInfo);
}

export default employeeSaga;