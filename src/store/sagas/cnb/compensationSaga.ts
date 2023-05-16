import { AnyAction } from "@reduxjs/toolkit";
import {
  getDataTable,
  getCompensationComponentOption,
} from "../saga-actions/cnb/compensationActions";
import { call, put, takeEvery, delay } from "redux-saga/effects";
import {
  getTableRequested,
  getTableSuccess,
  getTableFailed,
  getCompensationComponentOptionRequested,
  getCompensationComponentOptionSuccess,
  getCompensationComponentOptionFailed,
} from "@/store/reducers/slice/cnb/compensationSlice";
import { setResponserMessage } from "@/store/reducers/slice/responserSlice";
import { Services } from "@/types/axios";
import { AxiosError, AxiosResponse } from "axios";

// Get Data Table
function* fetchGetTable(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getDataTable, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: getTableSuccess.toString(),
        payload: {
          data: res.data.data,
        },
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getTableFailed.toString() });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: errorMessage?.code,
          message: errorMessage?.message,
        },
      });
    }
  }
}

// Get Compensation Component Option For Input
function* fetchGetCompensationComponentOption() {
  try {
    const res: AxiosResponse = yield call(getCompensationComponentOption);
    if (res.data.code === 200) {
      yield put({
        type: getCompensationComponentOptionSuccess.toString(),
        payload: {
          data: res.data.data,
        },
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getCompensationComponentOptionFailed.toString() });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: errorMessage?.code,
          message: errorMessage?.message,
        },
      });
    }
  }
}

function* cnbSaga() {
  yield takeEvery(getTableRequested.toString(), fetchGetTable);
  yield takeEvery(
    getCompensationComponentOptionRequested.toString(),
    fetchGetCompensationComponentOption
  );
}

export default cnbSaga;
