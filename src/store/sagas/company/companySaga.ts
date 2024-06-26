import { AnyAction } from '@reduxjs/toolkit';
import {
  getCompaniesItem,
  getCompanyTypeItem,
  getCompanySectorItem,
  getBankItem,
  getPaymentMethodItem,
  postCompanyProfile,
  getCompanyDetail,
  patchCompanyProfile,
  postCompanyPayments,
  getCompanyPayments,
  patchCompanyPayments
} from '../saga-actions/company/companyActions';
import { takeEvery, call, put } from 'redux-saga/effects';
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
  paymentMethodFailed,
  postCompanyProfileRequested,
  postCompanyProfileSuccess,
  postCompanyProfileFailed,
  getCompanyDetailRequested,
  getCompanyDetailSuccess,
  getCompanyDetailFailed,
  patchCompanyProfileRequested,
  patchCompanyProfileSuccess,
  patchCompanyProfileFailed,
  postCompanyPaymentsRequested,
  postCompanyPaymentsSuccess,
  postCompanyPaymentsFailed,
  patchCompanyPaymentsRequested,
  patchCompanyPaymentsSuccess,
  patchCompanyPaymentsFailed,
  getCompanyProfilePaymentsRequested,
  getCompanyProfilePaymentsSuccess,
  getCompanyProfilePaymentsFailed
} from '@/store/reducers/slice/company/companySlice';
import { Services } from '@/types/axios';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { AxiosError, AxiosResponse } from 'axios';
import Router from 'next/router';


/**
 * Fetch Companies
 *
 * @param action
 */

function* fetchGetCompanies() {
  try {
    const res: AxiosResponse = yield call(getCompaniesItem);
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
      yield put({ type: companiesFailed.toString() });
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
    const res: AxiosResponse = yield call(getCompanyTypeItem);
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
      yield put({ type: companyTypeFailed.toString() });
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
    const res: AxiosResponse = yield call(getCompanySectorItem);
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
      yield put({ type: companySectorFailed.toString() });
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
    const res: AxiosResponse = yield call(getBankItem);
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
      yield put({ type: bankFailed.toString() });
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
    const res: AxiosResponse = yield call(getPaymentMethodItem);
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
      yield put({ type: paymentMethodFailed.toString() });
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

function* fetchPostCompanyProfile(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postCompanyProfile, action?.payload?.companyProfile);
    if (res.data.code === 201) {
      yield put({ type: postCompanyProfileSuccess.toString(), payload: res.data.data });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: res.data.message
        }
      });
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
      yield put({ type: postCompanyProfileFailed.toString() });
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

function* fetchPostCompanyPayments(action: AnyAction) {
  try {
    const bankPayload = action?.payload?.payments?.bank;
    const payrollsPayload = action?.payload?.payments?.payrolls;
    const payload = {
      bank: bankPayload,
      payrolls: Object.values(payrollsPayload)
    };
    const res: AxiosResponse = yield call(postCompanyPayments,
      action?.payload?.companyID,
      payload
    );
    if (res.data.code === 201 || res.data.code === 200) {
      yield put({ type: postCompanyPaymentsSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: 'Successfully Saved!',
          footerMessage: 'New Company has been created'
        }
      });
      yield Router.push('/company');
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postCompanyPaymentsFailed.toString() });
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

function* fetchGetCompanyDetail(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getCompanyDetail, action?.payload);
    if (res.data.code === 200) {
      yield put({ type: getCompanyDetailSuccess.toString(), payload: res.data.data });
      const body = {
        type: getCompanyProfilePaymentsRequested.toString(),
        payload: action?.payload
      };
      yield call(fetchGetCompanyPaymentDetail, body);
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getCompanyDetailFailed.toString() });
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

function* fetchGetCompanyPaymentDetail(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getCompanyPayments, action?.payload?.id);
    if (res.data.code === 200) {
      yield put({
        type: getCompanyProfilePaymentsSuccess.toString(),
        payload: res?.data?.data
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getCompanyProfilePaymentsFailed.toString() });
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

function* fetchPatchCompanyProfile(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(patchCompanyProfile, action?.payload);
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: patchCompanyProfileSuccess.toString(), payload: res.data.data });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: 'Successfully Saved',
          footerMessage: 'Company profile has been updated'
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: patchCompanyProfileFailed.toString() });
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

function* fetchPatchCompanyPayments(action: AnyAction) {
  try {
    const bankPayload = action?.payload?.payments?.bank;
    const payrollsPayload = action?.payload?.payments?.payrolls;
    const payload = {
      bank: bankPayload,
      payrolls: Object.values(payrollsPayload)
    };
    const res: AxiosResponse = yield call(patchCompanyPayments,
      action?.payload?.id,
      payload
    );
    if (res) {
      yield put({ type: patchCompanyPaymentsSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: 'Successfully Saved',
          footerMessage: 'Company profile has been updated'
        }
      });
      yield Router.push('/company-management/company-profile');
    }

  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: patchCompanyPaymentsFailed.toString() });
      yield Router.push('/company-management/company-profile');
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

function* companySaga() {
  yield takeEvery(companiesRequested.toString(), fetchGetCompanies);
  yield takeEvery(companyTypeRequested.toString(), fetchGetCompanyType);
  yield takeEvery(companySectorRequested.toString(), fetchGetCompanySector);
  yield takeEvery(bankRequested.toString(), fetchGetBank);
  yield takeEvery(paymentMethodRequested.toString(), fetchGetPaymentMethod);
  yield takeEvery(postCompanyProfileRequested.toString(), fetchPostCompanyProfile);
  yield takeEvery(postCompanyPaymentsRequested.toString(), fetchPostCompanyPayments);
  yield takeEvery(getCompanyProfilePaymentsRequested.toString(), fetchGetCompanyPaymentDetail);
  yield takeEvery(getCompanyDetailRequested.toString(), fetchGetCompanyDetail);
  yield takeEvery(patchCompanyProfileRequested.toString(), fetchPatchCompanyProfile);
  yield takeEvery(patchCompanyPaymentsRequested.toString(), fetchPatchCompanyPayments);
}

export default companySaga;