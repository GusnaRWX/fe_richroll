import { AnyAction } from '@reduxjs/toolkit';
import {
  getPayroll,
  postPayroll,
  getGenerateGross,
  postPayrollAttendance,
  getDetailPayroll,
  getSelectedEmployee,
  postSelectedEmployee,
  postPayrollGrosses,
  getGenerateGrossEmployee,
  putGenerateGrosses,
  getPayrollGrosses,
  getDetailAttendance,
  putPayrollGrossesFinal,
  putPayrollGrossesId,
  putPayrollWorkflow
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
  postSelectedEmployeeSuccess,
  postPayrollGrossesRequested,
  postPayrollGrossesSuccess,
  postPayrollGrossesFailed,
  getGenerateGrossesEmployeeRequested,
  getGenerateGrossesEmployeeSuccess,
  getGenerateGrossesEmployeeFailed,
  putGenerateGrossesEmployeeRequested,
  putGenerateGrossesEmployeeSuccess,
  putGenerateGrossesEmployeeFailed,
  getPayrollGrossesRequested,
  getPayrollGrossesSuccess,
  getPayrollGrossesFailed,
  getDetailAttendanceFailed,
  getDetailAttendanceRequested,
  getDetailAttendanceSuccess,
  putPayrollsGrossesFinalRequested,
  putPayrollGrossesFinalSuccess,
  putPayrollGrossesFinalFailed,
  putPayrollGrossesIdRequested,
  putPayrollGrossesIdSuccess,
  putPayrollGrossesIdFailed,
  putPayrollWorkflowFailed,
  putPayrollWorkflowRequested,
  putPayrollWorkflowSuccess
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

function* fetchPostPayrollGrosses(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postPayrollGrosses, action?.payload?.data);
    if (res.data.code === 201) {
      yield put({
        type: postPayrollGrossesSuccess.toString(),
        payload: {
          data: res?.data?.data
        }
      });
      if (!action?.payload?.isAssist) {
        yield Router.push({ pathname: '/payroll-disbursement/payroll/generate-gross/employee', query: { id: res?.data?.data } });
      }
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postPayrollGrossesFailed.toString() });
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

function* fetchGetGenerateGrossEmployee(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getGenerateGrossEmployee, action?.payload);
    if (res.data.code === 201 || res.data.code === 200) {
      yield put({
        type: getGenerateGrossesEmployeeSuccess.toString(),
        payload: { data: res.data.data }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getGenerateGrossesEmployeeFailed.toString() });
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

function* fetchPutGenerateGrossEmployee(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(putGenerateGrosses, action?.payload);

    if (res.data.code === 201 || res.data.code === 200) {
      yield put({ type: putGenerateGrossesEmployeeSuccess.toString() });
      yield Router.push({ pathname: '/payroll-disbursement/payroll/generate-gross/detail', query: { id: res.data.data } });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: putGenerateGrossesEmployeeFailed.toString() });
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

// function* fetchGetPayrollEmployee(action: AnyAction) {
//   try {
//     const res: AxiosResponse = yield call(getPayrollGrosses, action?.payload);

//     if (res.data.code === 200) {
//       yield put({ type: getPayrollGrossesSuccess.toString(), payload: { data: res.data.data } });

function* fetchGetPayrollEmployee(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getPayrollGrosses, action?.payload);

    if (res.data.code === 200) {
      yield put({ type: getPayrollGrossesSuccess.toString(), payload: { data: res.data.data } });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getPayrollGrossesFailed.toString() });
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

function* fetchPutPayrollGrossesFinal(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(putPayrollGrossesFinal, action?.payload);

    if (res.data.code === 201 || res.data.code === 200) {
      yield put({ type: putPayrollGrossesFinalSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: 'Successfully Saved',
          footerMessage: 'Payroll has been created'
        }
      });
      yield Router.push({ pathname: '/payroll-disbursement/payroll' });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: putPayrollGrossesFinalFailed.toString() });
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

function* fetchPutPayrollGrossesId(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(putPayrollGrossesId, action?.payload);

    if (res.data.code === 201 || res.data.code === 200) {
      yield put({ type: putPayrollGrossesIdSuccess.toString() });
      yield put({
        type: getPayrollGrossesRequested.toString(),
        payload: res.data.data
      });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: res?.data?.message
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: putPayrollGrossesIdFailed.toString() });
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

function* fetchGetDetailAttendance(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getDetailAttendance, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: getDetailAttendanceSuccess.toString(),
        payload: {
          id: res?.data?.data?.id,
          employee: {
            id: res?.data?.data?.employee?.id,
            name: res?.data?.data?.employee?.name,
            picture: res?.data?.data?.employee?.picture
          },
          attendance: res?.data?.data?.attendance,
          absent: res?.data?.data?.absent,
          paidLeave: res?.data?.data?.paidLeave,
          unpaidLeave: res?.data?.data?.unpaidLeave,
          overtime: res?.data?.data?.overtime,
          totalHours: res?.data?.data?.totalHours,
          averageHours: res?.data?.data?.averageHours,
          events: res?.data?.data?.entries
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      // yield put({ type: getPayrollGrossesFailed.toString() });
      yield put({ type: getDetailAttendanceFailed.toString() });
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

function* fetchPutPayrollWorkflow(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(putPayrollWorkflow, action?.payload);
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({
        type: putPayrollWorkflowSuccess.toString()
      });
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
      // yield put({ type: getPayrollGrossesFailed.toString() });
      yield put({ type: putPayrollWorkflowFailed.toString() });
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
  yield takeEvery(postPayrollGrossesRequested.toString(), fetchPostPayrollGrosses);
  yield takeEvery(getGenerateGrossesEmployeeRequested.toString(), fetchGetGenerateGrossEmployee);
  yield takeEvery(putGenerateGrossesEmployeeRequested.toString(), fetchPutGenerateGrossEmployee);
  yield takeEvery(getPayrollGrossesRequested.toString(), fetchGetPayrollEmployee);
  yield takeEvery(getDetailAttendanceRequested.toString(), fetchGetDetailAttendance);
  yield takeEvery(putPayrollsGrossesFinalRequested.toString(), fetchPutPayrollGrossesFinal);
  yield takeEvery(putPayrollGrossesIdRequested.toString(), fetchPutPayrollGrossesId);
  yield takeEvery(putPayrollWorkflowRequested.toString(), fetchPutPayrollWorkflow);
}

export default payrollSaga;
