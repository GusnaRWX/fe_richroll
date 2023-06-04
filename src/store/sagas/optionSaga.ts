
import {
  getCountriesItem,
  getAdministrativeFirstLevel,
  getAdministrativeSecondLevel,
  getAdministrativeThirdLevel,
  getBanks,
  getListDepartment,
  getListPosition,
  getCnb,
  getListCompensation,
  getListTermin,
  getListSuppTermin
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
  getListPositionFailed,
  getSecondAdministrativeFirstLevelRequested,
  getSecondAdministrativeFirstLevelSuccess,
  getSecondAdministrativeFirstLevelFailed,
  getSecondAdministrativeSecondLevelRequested,
  getSecondAdministrativeSecondLevelSuccess,
  getSecondAdministrativeSecondLevelFailed,
  getSecondAdministrativeThirdLevelRequested,
  getSecondAdministrativeThirdLevelSuccess,
  getSecondAdministrativeThirdLevelFailed,
  getListCnbRequested,
  getListCnbFailed,
  getListCnbSuccess,
  getListCompensationFailed,
  getListCompensationRequested,
  getListCompensationSuccess,
  getListTerminFailed,
  getListTerminReqeusted,
  getListTerminSuccess,
  getListSuppTerminFailed,
  getListSuppTerminRequested,
  getListSuppTerminSuccess
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

/**
 * fetch Administirative level first
 * @param action
 */
function* fetchSecondAdministrativeLevelFirst(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getAdministrativeFirstLevel, action?.payload);
    if (res.status === 200) {
      const { items } = res?.data?.data as Option.AdministrativeLevel;
      yield put({
        type: getSecondAdministrativeFirstLevelSuccess.toString(),
        payload: {
          items: items
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield delay(2000, true);
      yield put({ type: getSecondAdministrativeFirstLevelFailed.toString() });
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
function* fetchSecondAdministrativeLevelSecond(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getAdministrativeSecondLevel, action?.payload);
    if (res.status === 200) {
      const { items } = res?.data?.data as Option.AdministrativeLevel;

      yield put({
        type: getSecondAdministrativeSecondLevelSuccess.toString(),
        payload: {
          items: items
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield delay(2000, true);
      yield put({ type: getSecondAdministrativeSecondLevelFailed.toString() });
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
function* fetchSecondAdministrativeLevelThird(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getAdministrativeThirdLevel, action?.payload);

    if (res.status === 200) {
      const { items } = res?.data?.data as Option.AdministrativeLevel;

      yield put({
        type: getSecondAdministrativeThirdLevelSuccess.toString(),
        payload: {
          items: items
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield delay(2000, true);
      yield put({ type: getSecondAdministrativeThirdLevelFailed.toString() });
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

function* fetchListCnb() {
  try {
    const res: AxiosResponse = yield call(getCnb);

    if (res.status === 200) {
      const { items } = res?.data?.data as Option.Cnb;

      yield put({
        type: getListCnbSuccess.toString(),
        payload: {
          items: items
        }
      });
    }
  } catch(err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield delay(2000, true);
      yield put({ type: getListCnbFailed.toString() });
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

function* fetchListCompensation() {
  try {
    const res: AxiosResponse = yield call(getListCompensation);

    if (res.status === 200) {
      const { items } = res?.data?.data as Option.Compensation;

      yield put({
        type: getListCompensationSuccess.toString(),
        payload: {
          items: items
        }
      });
    }
  } catch(err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield delay(2000, true);
      yield put({ type: getListCompensationFailed.toString() });
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

function* fetchListTermin(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getListTermin, action?.payload);

    if (res.status === 200) {
      const { items } = res?.data?.data as Option.Termin;

      yield put({
        type: getListTerminSuccess.toString(),
        payload: {
          items: items
        }
      });
    }
  } catch(err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield delay(2000, true);
      yield put({ type: getListTerminFailed.toString() });
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

function* fetchListSuppTermin(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getListSuppTermin, action?.payload);

    if (res.status === 200) {
      const { items } = res?.data?.data as Option.Termin;

      yield put({
        type: getListSuppTerminSuccess.toString(),
        payload: {
          items: items
        }
      });
    }
  } catch(err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield delay(2000, true);
      yield put({ type: getListSuppTerminFailed.toString() });
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
  yield takeEvery(getSecondAdministrativeFirstLevelRequested.toString(), fetchSecondAdministrativeLevelFirst);
  yield takeEvery(getSecondAdministrativeSecondLevelRequested.toString(), fetchSecondAdministrativeLevelSecond);
  yield takeEvery(getSecondAdministrativeThirdLevelRequested.toString(), fetchSecondAdministrativeLevelThird);
  yield takeEvery(getListCnbRequested.toString(), fetchListCnb);
  yield takeEvery(getListCompensationRequested.toString(), fetchListCompensation);
  yield takeEvery(getListTerminReqeusted.toString(), fetchListTermin);
  yield takeEvery(getListSuppTerminRequested.toString(), fetchListSuppTermin);
}

export default optionSaga;