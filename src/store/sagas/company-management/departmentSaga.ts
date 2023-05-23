import { AnyAction } from '@reduxjs/toolkit';
import { postDepartment } from '../saga-actions/company-management/departmentActions';
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import {
  postDepartmentRequested,
  postDepartmentSuccess,
  postDepartmentFailed,
} from '@/store/reducers/slice/company-management/department/departmentSlice';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';

/**
 * Fetch Post Department
 *
 * @param action
 */
function* fetchPostDepartment(action: AnyAction) {
  try {
    const payload = action?.payload;
    const res: AxiosResponse = yield call(postDepartment, payload);

    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: postDepartmentSuccess.toString() });
      yield delay(2000);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: res?.data?.message
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
  } catch (err) {

    if (err instanceof AxiosError<Services.ValidationResponse>) {
      console.log(err, 'error');
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postDepartmentFailed.toString() });
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

function* departmentSaga() {
  yield takeEvery(postDepartmentRequested.toString(), fetchPostDepartment);
}

export default departmentSaga;