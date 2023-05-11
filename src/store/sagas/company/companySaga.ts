import { getCompaniesItem, getCompanyTypeItem, getCompanySectorItem, getBankItem, getPaymentMethodItem } from '../saga-actions/company/companyActions';
import { takeEvery, call, put, delay } from 'redux-saga/effects';
import { Company } from '@/types/company';
import { 
  companiesRequested,
  companiesSuccess,
  companiesFailed,
  companyTypeRequested,
  companyTypeSuccess,
  companyTypeFailed,
  companySectorRequested,
  companySectorSuccess,
  companySectorFailed,
  bankRequested,
  bankSuccess,
  bankFailed,
  paymentMethodRequested,
  paymentMethodSuccess,
  paymentMethodFailed } from '../../reducers/slice/company/companySlice';
import { Services } from '@/types/axios';
import { setResponserMessage } from '../../reducers/slice/responserSlice';
import { AxiosError, AxiosResponse } from 'axios';


/**
 * Fetch Companies
 *
 * @param action
 */

function* fetchGetCompanies() {
  try {
    const res:AxiosResponse = yield call(getCompaniesItem);
    if (res.status === 200) {
      const { items } = res?.data?.data as Company.CompanyPayload;
      yield put({
        type: companiesSuccess.toString(), payload: {
          items: items
        }
      });
    }
  } catch (err) {

    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield delay(2000, true);
      yield put({ type: companiesFailed.toString() });
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
 * Fetch Company Type
 *
 * @param action
 */

function* fetchGetCompanyType() {
  try {
    const res:AxiosResponse = yield call(getCompanyTypeItem);
    if (res.status === 200) {
      const { items } = res?.data?.data as Company.CompanyPayload;
      yield put({
        type: companyTypeSuccess.toString(), payload: {
          items: items
        }
      });
    }
  } catch (err) {

    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield delay(2000, true);
      yield put({ type: companyTypeFailed.toString() });
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
 * Fetch Company Sector
 *
 * @param action
 */

function* fetchGetCompanySector() {
  try {
    const res:AxiosResponse = yield call(getCompanySectorItem);
    if (res.status === 200) {
      const { items } = res?.data?.data as Company.CompanyPayload;
      yield put({
        type: companySectorSuccess.toString(), payload: {
          items: items
        }
      });
    }
  } catch (err) {

    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield delay(2000, true);
      yield put({ type: companySectorFailed.toString() });
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
 * Fetch Bank
 *
 * @param action
 */

function* fetchGetBank() {
  try {
    const res:AxiosResponse = yield call(getBankItem);
    if (res.status === 200) {
      const { items } = res?.data?.data as Company.CompanyPayload;
      yield put({
        type: bankSuccess.toString(), payload: {
          items: items
        }
      });
    }
  } catch (err) {

    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield delay(2000, true);
      yield put({ type: bankFailed.toString() });
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
 * Fetch Payment Method
 *
 * @param action
 */

function* fetchGetPaymentMethod() {
  try {
    const res:AxiosResponse = yield call(getPaymentMethodItem);
    if (res.status === 200) {
      const { items } = res?.data?.data as Company.CompanyPayload;
      yield put({
        type: paymentMethodSuccess.toString(), payload: {
          items: items
        }
      });
    }
  } catch (err) {

    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield delay(2000, true);
      yield put({ type: paymentMethodFailed.toString() });
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

function* companySaga() {
  yield takeEvery(companiesRequested.toString(), fetchGetCompanies);
  yield takeEvery(companyTypeRequested.toString(), fetchGetCompanyType);
  yield takeEvery(companySectorRequested.toString(), fetchGetCompanySector);
  yield takeEvery(bankRequested.toString(), fetchGetBank);
  yield takeEvery(paymentMethodRequested.toString(), fetchGetPaymentMethod);
}

export default companySaga;