import { AnyAction } from '@reduxjs/toolkit';
import {
  postSimulationEvent,
  postCalculateEvent,
  postWorkSchedule,
  getListWorkSchedule,
  getDetailWorkSchedule,
  deleteWorkSchedule,
  patchWorkSchedule
} from '../saga-actions/company-management/workScheduleActions';
import {
  postSimulationEventRequested,
  postSimulationEventFailed,
  postSimulationEventSuccess,
  postCalculateEventRequested,
  postCalculateEventFailed,
  postCalculateEventSuccess,
  postWorkScheduleRequested,
  postWorkScheduleFailed,
  postWorkScheduleSuccess,
  getListWorkScheduleRequested,
  getListWorkSchedulerFailed,
  getListWorkSchedulerSuccess,
  getDetailWorkScheduleRequested,
  getDetailWorkScheduleFailed,
  getDetailWorkScheduleSuccess,
  deleteWorkScheduleRequested,
  deleteWorkScheduleFailed,
  deleteWorkScheduleSuccess,
  patchWorkScheduleRequested,
  patchWorkScheduleFailed,
  patchWorkScheduleSuccess,
  clearState
} from '@/store/reducers/slice/company-management/work-schedule/workScheduleSlice';
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';
import Router from 'next/router';
import { getCompanyData } from '@/utils/helper';

function* fetchGetListWorkSchedule(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getListWorkSchedule, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: getListWorkSchedulerSuccess.toString(),
        payload: {
          data: res.data.data
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getListWorkSchedulerFailed.toString() });
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

function* fetchPostSimulationEvent(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postSimulationEvent, action?.payload);
    if (res.data.code === 200) {

      yield put({
        type: postSimulationEventSuccess.toString(), payload: {
          events: res.data.data
        }
      });
      // const data = {
      //   type: postCalculateEventRequested.toString(),
      //   payload: {
      //     items: [...res.data.data]
      //   }
      // };
      // yield call(fetchPostCalculateEvent, data);

    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const error = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postSimulationEventFailed.toString() });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: error?.code,
          message: error?.message
        }
      });
    }
  }
}

function* fetchPostCalculateEvent(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postCalculateEvent, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: postCalculateEventSuccess.toString(),
        payload: {
          grossHour: res.data.data.gross,
          netHour: res.data.data.net
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const error = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postCalculateEventFailed.toString() });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: error?.code,
          message: error?.message
        }
      });
    }
  }
}

function* fetchPostWorkSchedule(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postWorkSchedule, action?.payload);
    if (res.data.code === 201) {
      yield put({ type: postWorkScheduleSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: 'Successfully saved!',
          footerMessage: `New Work Schedule Profile "${action?.payload?.name}" has been created`
        }
      });
      yield Router.push('/company-management/work-schedule');
      yield put({ type: clearState.toString() });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const error = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postWorkScheduleFailed.toString() });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: error?.code,
          message: error?.message
        }
      });
    }
  }
}

function* fetchGetDetailWorkSchedule(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getDetailWorkSchedule, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: getDetailWorkScheduleSuccess.toString(),
        payload: {
          id: res?.data?.data?.id,
          name: res?.data?.data?.name,
          grossHour: 0,
          netHour: 0,
          events: res?.data?.data?.items
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getDetailWorkScheduleFailed.toString() });
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

function* fetchDeleteWorkSchedule(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(deleteWorkSchedule, action?.payload);
    if (res.data.code === 200) {
      yield put({ type: deleteWorkScheduleSuccess.toString() });
      yield put({
        type: getListWorkScheduleRequested.toString(),
        payload: {
          page: 1,
          itemPerPage: 5,
          sort: '',
          direction: 'ASC',
          search: '',
          companyID: getCompanyData()?.id
        }
      });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: res.data.message
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const error = err?.response?.data as Services.ErrorResponse;
      yield put({ type: deleteWorkScheduleFailed.toString() });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: error?.code,
          message: error?.message
        }
      });
    }
  }
}

function* fetchPatchUpdateWorkSchedule(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(patchWorkSchedule, action?.payload);
    if (res.data.code === 200) {
      yield put({ type: patchWorkScheduleSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: res.data.message
        }
      });
      yield Router.push('/company-management/work-schedule');
      yield put({ type: clearState.toString() });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const error = err?.response?.data as Services.ErrorResponse;
      yield put({ type: patchWorkScheduleFailed.toString() });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: error?.code,
          message: error?.message
        }
      });
    }
  }
}

function* workScheduleSaga() {
  yield takeEvery(postSimulationEventRequested.toString(), fetchPostSimulationEvent);
  yield takeEvery(postCalculateEventRequested.toString(), fetchPostCalculateEvent);
  yield takeEvery(postWorkScheduleRequested.toString(), fetchPostWorkSchedule);
  yield takeEvery(getListWorkScheduleRequested.toString(), fetchGetListWorkSchedule);
  yield takeEvery(getDetailWorkScheduleRequested.toString(), fetchGetDetailWorkSchedule);
  yield takeEvery(deleteWorkScheduleRequested.toString(), fetchDeleteWorkSchedule);
  yield takeEvery(patchWorkScheduleRequested.toString(), fetchPatchUpdateWorkSchedule);
}

export default workScheduleSaga;