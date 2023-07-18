import { AnyAction } from '@reduxjs/toolkit';
import {
  getPayroll,
  postPayroll,
  getGenerateGross,
  postPayrollAttendance,
  getDetailPayroll,
  getSelectedEmployee,
  postSelectedEmployee
} from '../saga-actions/payroll/payrollActions';
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import {
  getPayrollRequested,
  getPayrollSuccess,
  getPayrollFailed,
  postPayrollRequested,
  postPayrollSuccess,
  postPayrollFailed,
  getGenerateGrossPayrollRequested,
  getGenerateGrossPayrollSuccess,
  getGenerateGrossPayrollFailed,
  postPayrollAttendanceFailed,
  postPayrollAttendanceRequested,
  postPayrollAttendanceSuccess,
  getDetailPayrollFailed,
  getDetailPayrollRequested,
  getDetailPayrollSuccess,
  getSelectedEmployeeFailed,
  getSelectedEmployeeRequested,
  getSelectedEmployeeSuccess,
  postSelectedEmployeeFailed,
  postSelectedEmployeeRequested,
  postSelectedEmployeeSuccess
} from '@/store/reducers/slice/payroll/payrollSlice';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';
import Router from 'next/router';


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
      yield put({ type: postPayrollSuccess.toString(), payload: res.data.data });
      if (action?.payload?.isAttendance === true) {
        Router.push({ pathname: '/payroll-disbursement/attendance/generate', query: { id: res.data.data } });
      } else {
        Router.push({ pathname: '/payroll-disbursement/payroll-assistant/create', query: { id: res.data.data } });
      }
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

function* fetchGetGenerateGross(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getGenerateGross, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: getGenerateGrossPayrollSuccess.toString(),
        payload: {
          data: res?.data?.data
        }
      });
    }
  } catch (err) {
    yield put({ type: getGenerateGrossPayrollFailed.toString() });
  }
}

function* fetchPostPayrollAttendance(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postPayrollAttendance, action?.payload);
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: postPayrollAttendanceSuccess.toString() });
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
      yield put({ type: postPayrollAttendanceFailed.toString() });
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

function* fetchgetDetailPayroll(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getDetailPayroll, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: getDetailPayrollSuccess.toString(), payload: {
          id: res?.data?.data?.id,
          name: res?.data?.data.name,
          start: res?.data?.data.start,
          end: res?.data?.data?.end,
          workflow: res?.data?.data?.workflow
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getDetailPayrollFailed.toString() });
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

function* fetchPostSelectedEmployee(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postSelectedEmployee, action?.payload);
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: postSelectedEmployeeSuccess.toString() });
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
      yield put({ type: postSelectedEmployeeFailed.toString() });
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

function* fetchGetSelectedEmployee(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getSelectedEmployee, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: getSelectedEmployeeSuccess.toString(), payload: {
          data: res?.data?.data
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getSelectedEmployeeFailed.toString() });
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
  yield takeEvery(getGenerateGrossPayrollRequested.toString(), fetchGetGenerateGross);
  yield takeEvery(postPayrollAttendanceRequested.toString(), fetchPostPayrollAttendance);
  yield takeEvery(getDetailPayrollRequested.toString(), fetchgetDetailPayroll);
  yield takeEvery(postSelectedEmployeeRequested.toString(), fetchPostSelectedEmployee);
  yield takeEvery(getSelectedEmployeeRequested.toString(), fetchGetSelectedEmployee);
}

export default payrollSaga;
