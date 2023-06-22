import { AnyAction } from '@reduxjs/toolkit';
import {
  getListAnnualSchedule,
  postAnnualSchedule,
  updateAnnualSchedule,
  deleteAnnualSchedule,
  getListEventSchedule,
  getViewAnnualSchedule
} from '../saga-actions/company-management/annualScheduleActions';
import {
  getListAnnualScheduleFailed,
  getListAnnualScheduleRequested,
  getListAnnualScheduleSuccess,
  postAnnualScheduleFailed,
  postAnnualScheduleRequested,
  postAnnualScheduleSuccess,
  updateAnnualScheduleFailed,
  updateAnnualScheduleRequested,
  updateAnnualScheduleSuccess,
  deleteAnnualScheduleFailed,
  deleteAnnualScheduleRequested,
  deleteAnnualScheduleSuccess,
  getListEventFailed,
  getListEventRequested,
  getListEventSuccess,
  getViewAnnualScheduleFailed,
  getViewAnnualScheduleRequested,
  getViewAnnualScheduleSuccess
} from '@/store/reducers/slice/company-management/annual-work-schedule/annualSchedule';
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';

function* fetchGetListAnnualSchedule(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getListAnnualSchedule, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: getListAnnualScheduleSuccess.toString(),
        payload: {
          data: res.data.data
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getListAnnualScheduleFailed.toString() });
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

function* fetchPostAnnualSchedule(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postAnnualSchedule, action?.payload);
    if (res.data.code === 201) {
      yield put({ type: postAnnualScheduleSuccess.toString() });
      yield put({
        type: getListAnnualScheduleRequested.toString(),
        payload: {
          page: 1,
          itemPerPage: 5,
          sort: '',
          direction: 'ASC',
          search: '',
          start: '',
          end: ''
        }
      });
      yield put({ type: getListEventRequested.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: 'Successfully Saved!',
          footerMessage: `${action?.payload?.name || ''} has been added to the Annual Work Calendar`
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const error = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postAnnualScheduleFailed.toString() });
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

function* fetchUpdateAnnualSchedule(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(updateAnnualSchedule, action?.payload);
    if (res.data.code === 200) {
      yield put({ type: updateAnnualScheduleSuccess.toString() });
      yield put({
        type: getListAnnualScheduleRequested.toString(),
        payload: {
          page: 1,
          itemPerPage: 5,
          sort: '',
          direction: 'ASC',
          search: '',
          start: '',
          end: ''
        }
      });
      yield put({ type: getListEventRequested.toString() });
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
      yield put({ type: updateAnnualScheduleFailed.toString() });
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

function* fetchDeleteAnnualSchedule(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(deleteAnnualSchedule, action?.payload);
    if (res.data.code === 200) {
      yield put({ type: deleteAnnualScheduleSuccess.toString() });
      yield put({
        type: getListAnnualScheduleRequested.toString(),
        payload: {
          page: 1,
          itemPerPage: 5,
          sort: '',
          direction: 'ASC',
          search: '',
          start: '',
          end: ''
        }
      });
      yield put({ type: getListEventRequested.toString() });
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
      yield put({ type: deleteAnnualScheduleFailed.toString() });
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

function* fetchListEventSchedule() {
  try {
    const res: AxiosResponse = yield call(getListEventSchedule);
    if (res.data.code === 200) {
      yield put({
        type: getListEventSuccess.toString(),
        payload: {
          data: res.data.data
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getListEventFailed.toString() });
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

function* fetchGetViewSchedule(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getViewAnnualSchedule, action?.payload);
    if (res.data.code === 200){
      yield put({
        type: getViewAnnualScheduleSuccess.toString(),
        payload: {
          data: res?.data?.data
        }
      });
    }
  }catch(err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getViewAnnualScheduleFailed.toString() });
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

function* annualScheduleSaga() {
  yield takeEvery(getListAnnualScheduleRequested.toString(), fetchGetListAnnualSchedule);
  yield takeEvery(postAnnualScheduleRequested.toString(), fetchPostAnnualSchedule);
  yield takeEvery(updateAnnualScheduleRequested.toString(), fetchUpdateAnnualSchedule);
  yield takeEvery(deleteAnnualScheduleRequested.toString(), fetchDeleteAnnualSchedule);
  yield takeEvery(getListEventRequested.toString(), fetchListEventSchedule);
  yield takeEvery(getViewAnnualScheduleRequested.toString(), fetchGetViewSchedule);
}

export default annualScheduleSaga;