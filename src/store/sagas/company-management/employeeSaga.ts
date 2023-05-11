import { AnyAction } from '@reduxjs/toolkit';
import { getEmployee, postEmployeeInfo, postEmergency, postPersonalInformation } from '../saga-actions/company-management/employeeActions';
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import {
  getEmployeeRequested,
  getEmployeeSuccess,
  getEmployeeFailed,
  postEmployeeInfoRequested,
  postEmployeeInfoSuccess,
  postEmployeeInfoFailed,
  postEmergencyRequested,
  postEmergencySuccess,
  postEmergencyFailed,
  postPersonalInformationRequested,
  postPersonalInformationSuccess,
  postPersonalInformationFailed
} from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';


function* fetchGetEmployee(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getEmployee, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: getEmployeeSuccess.toString(),
        payload: {
          data: res.data.data
        }
      });
    }
  } catch (err) {
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
    if (res.data.code === 201) {
      yield put({ type: postEmployeeInfoSuccess.toString(), payload: res.data.data });
      yield delay(2000);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
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
  } catch (err) {
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

function* fetchPostEmergency(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postEmergency, action?.payload);
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: postEmergencySuccess.toString() });
      yield delay(2000);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
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
      yield put({ type: postEmergencyFailed.toString() });
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

/**
 * Fetch Post Personal Information
 * 
 * @param action
 */
function* fetchPostPersonalInformation(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postPersonalInformation, action?.payload);

    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: postPersonalInformationSuccess.toString() });
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
      yield put({ type: postPersonalInformationFailed.toString() });
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

function* employeeSaga() {
  yield takeEvery(getEmployeeRequested.toString(), fetchGetEmployee);
  yield takeEvery(postEmployeeInfoRequested.toString(), fetchPostEmployeeInfo);
  yield takeEvery(postEmergencyRequested.toString(), fetchPostEmergency);
  yield takeEvery(postPersonalInformationRequested.toString(), fetchPostPersonalInformation);
}

export default employeeSaga;