
import { getCountriesItem } from './saga-actions/optionActions';
import { takeEvery, call, put, delay } from 'redux-saga/effects';
import { Option } from '@/types/option';
import { countriesRequested, countriesSuccess, countriesFailed } from '../reducers/slice/options/optionSlice';
import { Services } from '@/types/axios';
import { setResponserMessage } from '../reducers/slice/responserSlice';
import { AxiosError, AxiosResponse } from 'axios';


/**
 * Fetch Countries
 *
 * @param action
 */

function* fetchGetCountries() {
  try {
    const res:AxiosResponse = yield call(getCountriesItem);
    if (res.status === 200) {
      const { items } = res?.data?.data as Option.CountryPayload;
      yield delay(2000, true);
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

function* optionSaga() {
  yield takeEvery(countriesRequested.toString(), fetchGetCountries);
}

export default optionSaga;