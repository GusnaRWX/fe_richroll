
import {
  getCountriesItem,
  getAdministrativeFirstLevel,
  getAdministrativeSecondLevel,
  getAdministrativeThirdLevel,
  getBanks,
  getListDepartment,
  getListPosition
} from './saga-actions/optionActions';
import { takeEvery, call, put, delay } from 'redux-saga/effects';
import { Option } from '@/types/option';
import {
  countriesRequested,
  countriesSuccess,
  countriesFailed,
  administrativeFirstLevelSuccess,
  administrativeFirstLevelFailed,
  administrativeFirstLevelRequested,
  administrativeSecondLevelFailed,
  administrativeSecondLevelSuccess,
  administrativeSecondLevelRequested,
  administrativeThirdLevelFailed,
  administrativeThirdLevelSuccess,
  administrativeThirdLevelRequsted,
  getBanksRequested,
  getBanksSuccess,
  getBanksFailed,
  getListDepartmentRequested,
  getListDepartmentSuccess,
  getListDepartmentFailed,
  getListPositionRequested,
  getListPositionSuccess,
  getListPositionFailed
} from '../reducers/slice/options/optionSlice';
import { Services } from '@/types/axios';
import { setResponserMessage } from '../reducers/slice/responserSlice';
import { AxiosError, AxiosResponse } from 'axios';
import { AnyAction } from '@reduxjs/toolkit';


/**
 * Fetch Countries
 *
 * @param action
 */

function* fetchGetCountries() {
  try {
    const res: AxiosResponse = yield call(getCountriesItem);
    if (res.status === 200) {
      const { items } = res?.data?.data as Option.CountryPayload;
      yield put({
        type: countriesSuccess.toString(), payload: {
          items: items
        }
      });
    }
  } catch (err) {

    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield delay(2000, true);
      yield put({ type: countriesFailed.toString() });
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
 * fetch Administirative level first
 * @param action
 */
function* fetchAdministrativeLevelFirst(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getAdministrativeFirstLevel, action?.payload);
    if (res.status === 200) {
      const { items } = res?.data?.data as Option.AdministrativeLevel;
      yield put({
        type: administrativeFirstLevelSuccess.toString(),
        payload: {
          items: items
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield delay(2000, true);
      yield put({ type: administrativeFirstLevelFailed.toString() });
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
 * Fetch adminstiirative level second
 *
 * @param action
 */
function* fetchAdministrativeLevelSecond(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getAdministrativeSecondLevel, action?.payload);
    if (res.status === 200) {
      const { items } = res?.data?.data as Option.AdministrativeLevel;

      yield put({
        type: administrativeSecondLevelSuccess.toString(),
        payload: {
          items: items
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield delay(2000, true);
      yield put({ type: administrativeSecondLevelFailed.toString() });
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
 * Fetch Administritive Level third
 *
 * @param action
 */
function* fetchAdministrativeLevelThird(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getAdministrativeThirdLevel, action?.payload);

    if (res.status === 200) {
      const { items } = res?.data?.data as Option.AdministrativeLevel;

      yield put({
        type: administrativeThirdLevelSuccess.toString(),
        payload: {
          items: items
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield delay(2000, true);
      yield put({ type: administrativeThirdLevelFailed.toString() });
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
 * Get banks
 */
function* fetchGetBanks() {
  try {
    const res: AxiosResponse = yield call(getBanks);
    if (res.status === 200) {
      const { items } = res?.data?.data as Option.Banks;

      yield put({
        type: getBanksSuccess.toString(),
        payload: {
          items: items
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield delay(2000, true);
      yield put({ type: getBanksFailed.toString() });
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

function* fetchGetListDepartment() {
  try {
    const res: AxiosResponse = yield call(getListDepartment);
    if (res.status === 200) {
      const { items } = res?.data?.data as Option.Department;

      yield put({
        type: getListDepartmentSuccess.toString(),
        payload: {
          items: items
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield delay(2000, true);
      yield put({ type: getListDepartmentFailed.toString() });
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

function* fetchGetListPosition(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getListPosition, action?.payload);
    if (res.status === 200) {
      const { items } = res?.data?.data as Option.Position;

      yield put({
        type: getListPositionSuccess.toString(),
        payload: {
          items: items
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield delay(2000, true);
      yield put({ type: getListPositionFailed.toString() });
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

function* optionSaga() {
  yield takeEvery(countriesRequested.toString(), fetchGetCountries);
  yield takeEvery(administrativeFirstLevelRequested.toString(), fetchAdministrativeLevelFirst);
  yield takeEvery(administrativeSecondLevelRequested.toString(), fetchAdministrativeLevelSecond);
  yield takeEvery(administrativeThirdLevelRequsted.toString(), fetchAdministrativeLevelThird);
  yield takeEvery(getBanksRequested.toString(), fetchGetBanks);
  yield takeEvery(getListDepartmentRequested.toString(), fetchGetListDepartment);
  yield takeEvery(getListPositionRequested.toString(), fetchGetListPosition);
}

export default optionSaga;