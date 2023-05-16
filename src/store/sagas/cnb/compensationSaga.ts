import { AnyAction } from "@reduxjs/toolkit";
import { getDataTable } from "../saga-actions/cnb/compensationActions";
import { call, put, takeEvery, delay } from "redux-saga/effects";
import {
  getTableRequested,
  getTableSuccess,
  getTableFailed,
} from "@/store/reducers/slice/cnb/compensationSlice";
import { setResponserMessage } from "@/store/reducers/slice/responserSlice";
import { Services } from "@/types/axios";
import { AxiosError, AxiosResponse } from "axios";

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

function* cnbSaga() {
  yield takeEvery(getTableRequested.toString(), fetchGetTable);
}

export default cnbSaga;
