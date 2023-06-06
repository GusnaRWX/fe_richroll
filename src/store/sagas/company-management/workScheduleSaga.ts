import { AnyAction } from '@reduxjs/toolkit';
import {
  postSimulationEvent,
  postCalculateEvent,
  postWorkSchedule,
  getListWorkSchedule
} from '../saga-actions/company-management/workScheduleActions';
import {
  postSimulationEventRequested,
  postSimulationEventFailed,
  postSimulationEventSuccess,
  postCalculateEventRequested,
  postCalculateEventFailed,
  postCalculateEventSuccess,
  postWorkScheduleFailed,
  postWorkScheduleRequested,
  postWorkScheduleSuccess,
  getListWorkScheduleRequested,
  getListWorkSchedulerFailed,
  getListWorkSchedulerSuccess,
  clearState
} from '@/store/reducers/slice/company-management/work-schedule/workScheduleSlice';
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';
import Router from 'next/router';

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
      yield put({ type: postSimulationEventSuccess.toString(), payload: {
        events: res.data.data
      } });
      const data = {
        type: postCalculateEventRequested.toString(),
        payload: {
          items: [...res.data.data]
        }
      };
      yield call(fetchPostCalculateEvent, data);

    }
  } catch(err) {
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

function* fetchPostWorkSchedule (action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postWorkSchedule, action?.payload);
    if (res.data.code === 201) {
      yield put({ type: postWorkScheduleSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: 'Successfully saved!',
          footerMessage: `New Work Schedule Profile ${action.payload.name} has been created`
        }
      });
      yield Router.push('/company-management/work-schedule');
      yield put({ type: clearState.toString() });
    }
  } catch(err) {
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

function* workScheduleSaga() {
  yield takeEvery(postSimulationEventRequested.toString(), fetchPostSimulationEvent);
  yield takeEvery(postCalculateEventRequested.toString(), fetchPostCalculateEvent);
  yield takeEvery(postWorkScheduleRequested.toString(), fetchPostWorkSchedule);
  yield takeEvery(getListWorkScheduleRequested.toString(), fetchGetListWorkSchedule);
}

export default workScheduleSaga;