import { AnyAction } from '@reduxjs/toolkit';
import {
  getPayroll,
  getPayrollCompleted,
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
  putPayrollWorkflow,
  postPayrollDisbursementId,
  getPayrollDisbursementId,
  getNetPayroll,
  postNetPayroll,
  patchNetPayrollFinal,
  deletePayroll,
  deletePayrollAssist,
  postPayrollDisbursementPaid,
  patchPayrollDisbursementFinal
} from '../saga-actions/payroll/payrollActions';
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import {
  getPayrollRequested,
  getPayrollSuccess,
  getPayrollFailed,
  getPayrollCompletedRequested,
  getPayrollCompletedSuccess,
  getPayrollCompletedFailed,
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
  putPayrollWorkflowSuccess,
  postPayrollDisbursementIdRequested,
  postPayrollDisbursementIdSuccess,
  postPayrollDisbursementIdFailed,
  getPayrollDisbursementIdRequested,
  getPayrollDisbursementIdSuccess,
  getPayrollDisbursementIdFailed,
  getNetPayrollFailed,
  getNetPayrollRequested,
  getNetPayrollSuccess,
  postNetPayrollFailed,
  postNetPayrollRequested,
  postNetPayrollSuccess,
  patchNetPayrollFinalFailed,
  patchNetPayrollFinalRequested,
  patchNetPayrollFinalSuccess,
  deletePayrollFailed,
  deletePayrollRequested,
  deletePayrollSuccess,
  postPayrollDisbursementPaidRequested,
  postPayrollDisbursementPaidSuccess,
  postPayrollDisbursementPaidFailed,
  patchPayrollDisbursementFinalRequested,
  patchPayrollDisbursementFinalSuccess,
  patchPayrollDisbursementFinalFailed,
  generateNetAssistRequested,
  generateNetAssistSuccess,
  generateNetAssistFailed,
  generateDisbursementAssistRequested,
  generateDisbursementAssistSuccess,
  generateDisbursementAssistFailed,
  deletePayrollAssistRequested,
  deletePayrollAssistSuccess,
  deletePayrollAssistFailed,
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

function* fetchGetPayrollCompleted(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getPayrollCompleted, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: getPayrollCompletedSuccess.toString(),
        payload: {
          data: res?.data?.data
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getPayrollCompletedFailed.toString() });
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
        Router.push({ pathname: '/payroll-disbursement/attendance/generate', query: { id: res.data.data.id } });
      } else {
        Router.push({ pathname: '/payroll-disbursement/payroll-assistant/create', query: { id: res.data.data.assistantID } });
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

function* fetchDeletePayroll(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(deletePayroll, action?.payload);
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: deletePayrollSuccess.toString() });
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
      yield put({ type: deletePayrollFailed.toString() });
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

function* fetchDeletePayrollAssist(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(deletePayrollAssist, action?.payload);
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: deletePayrollAssistSuccess.toString() });
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
      yield put({ type: deletePayrollAssistFailed.toString() });
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
          data: res?.data?.data?.id
        }
      });

      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: res?.data?.message
        }
      });

      if (!action?.payload?.isAssist) {
        yield Router.push({ pathname: '/payroll-disbursement/payroll/generate-gross/employee', query: { id: res?.data?.data?.id } });
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

      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: res?.data?.message
        }
      });

      yield Router.push({ pathname: '/payroll-disbursement/payroll/generate-gross/detail', query: { id: res.data.data?.id } });
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
    const res: AxiosResponse = yield call(putPayrollGrossesFinal, action?.payload?.data);

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
      if (!action?.payload?.isAssist) {
        yield put({
          type: putPayrollWorkflowRequested.toString(),
          payload: {
            id: action?.payload?.data?.id,
            data: {
              workflow: 1,
              status: 1
            }
          }
        });
        yield Router.push({ pathname: '/payroll-disbursement/payroll' });
      }
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
        payload: res.data.data?.id
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
          events: res?.data?.data?.entries,
          netHours: res?.data?.data?.netHours
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

function* fetchPostPayrollDisbursementsId(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postPayrollDisbursementId, action?.payload);

    if (res.data.code === 201) {
      yield put({
        type: postPayrollDisbursementIdSuccess.toString(),
        payload: {
          data: res?.data?.data?.id
        }
      });

      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: res?.data?.message
        }
      });

      if (!action?.payload?.isAssist) {
        yield Router.push({ pathname: '/payroll-disbursement/disbursement/generate', query: { id: res?.data?.data?.id } });
      }
    }

  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postPayrollDisbursementIdFailed.toString() });
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

function* fetchGetPayrollDisbursementId(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getPayrollDisbursementId, action?.payload);

    if (res.data.code === 200) {
      yield put({
        type: getPayrollDisbursementIdSuccess.toString(),
        payload: {
          data: res.data.data
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getPayrollDisbursementIdFailed.toString() });
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

function* fetchGetNetPayroll(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getNetPayroll, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: getNetPayrollSuccess.toString(),
        payload: {
          data: res?.data?.data
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getNetPayrollFailed.toString() });
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

function* fetchPostNetPayroll(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postNetPayroll, action?.payload);
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({
        type: postNetPayrollSuccess.toString(),
        payload: {
          data: res?.data?.data?.id
        }
      });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: res?.data?.message
        }
      });
      if (!action?.payload?.isAssist) {
        yield Router.push({ pathname: '/payroll-disbursement/payroll/generate-net', query: { id: res?.data?.data?.id } });
      }
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postNetPayrollFailed.toString() });
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

function* fetchPatchNetPayrollFinal(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(patchNetPayrollFinal, action?.payload?.data);
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: patchNetPayrollFinalSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: res?.data?.message
        }
      });
      if (!action?.payload?.isAssist) {
        yield put({
          type: putPayrollWorkflowRequested.toString(),
          payload: {
            id: action?.payload?.data?.id,
            data: {
              workflow: 2,
              status: 1
            }
          }
        });
        yield Router.push({ pathname: '/payroll-disbursement/payroll' });
      }
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: patchNetPayrollFinalFailed.toString() });
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

function* fetchPostPayrollDisbursementPaid(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postPayrollDisbursementPaid, action?.payload);

    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: postPayrollDisbursementPaidSuccess.toString() });

      yield put({
        type: getPayrollDisbursementIdRequested.toString(),
        payload: {
          id: action?.payload?.id
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
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postPayrollDisbursementPaidFailed.toString() });

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

function* fetchPatchPayrollDisbursementFinal(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(patchPayrollDisbursementFinal, action?.payload);

    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: patchPayrollDisbursementFinalSuccess.toString() });

      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: res?.data?.message
        }
      });

      if (action?.payload?.isAssist) {
        yield Router.push('/payroll-disbursement/payroll-assistant');
      } else {
        yield Router.push('/payroll-disbursement/disbursement');
      }
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: patchPayrollDisbursementFinalFailed.toString() });

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

function* fetchGenerateNetAssistant(action: AnyAction) {
  try {
    yield put({ type: generateNetAssistSuccess.toString() });
    yield put({
      type: putPayrollWorkflowRequested.toString(),
      payload: {
        id: action?.payload?.grossesId,
        data: {
          workflow: 1,
          status: 1
        }
      }
    });
    yield put({
      type: putPayrollsGrossesFinalRequested.toString(),
      payload: {
        data: {
          id: action?.payload?.grossesId
        },
        isAssist: true
      }
    });
    yield put({
      type: postNetPayrollRequested.toString(),
      payload: {
        id: action?.payload?.grossesId,
        data: {
          assistantID: action?.payload?.assistantID
        },
        isAssist: true
      }
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: generateNetAssistFailed.toString() });
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

function* fetchGenerateDisbursementAssistant(action: AnyAction) {
  try {
    yield put({ type: generateDisbursementAssistSuccess.toString() });
    yield put({
      type: putPayrollWorkflowRequested.toString(),
      payload: {
        id: action?.payload?.netId,
        data: {
          workflow: 2,
          status: 1
        }
      }
    });
    yield put({
      type: patchNetPayrollFinalRequested.toString(),
      payload: {
        data: {
          id: action?.payload?.netId
        },
        isAssist: true
      }
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: generateDisbursementAssistFailed.toString() });
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
  yield takeEvery(getPayrollCompletedRequested.toString(), fetchGetPayrollCompleted);
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
  yield takeEvery(postPayrollDisbursementIdRequested.toString(), fetchPostPayrollDisbursementsId);
  yield takeEvery(getPayrollDisbursementIdRequested.toString(), fetchGetPayrollDisbursementId);
  yield takeEvery(getNetPayrollRequested.toString(), fetchGetNetPayroll);
  yield takeEvery(postNetPayrollRequested.toString(), fetchPostNetPayroll);
  yield takeEvery(patchNetPayrollFinalRequested.toString(), fetchPatchNetPayrollFinal);
  yield takeEvery(deletePayrollRequested.toString(), fetchDeletePayroll);
  yield takeEvery(deletePayrollAssistRequested.toString(), fetchDeletePayrollAssist);
  yield takeEvery(postPayrollDisbursementPaidRequested.toString(), fetchPostPayrollDisbursementPaid);
  yield takeEvery(patchPayrollDisbursementFinalRequested.toString(), fetchPatchPayrollDisbursementFinal);
  yield takeEvery(generateNetAssistRequested.toString(), fetchGenerateNetAssistant);
  yield takeEvery(generateDisbursementAssistRequested.toString(), fetchGenerateDisbursementAssistant);
}

export default payrollSaga;