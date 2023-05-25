import { AnyAction } from '@reduxjs/toolkit';
import {
  getEmployee,
  postEmployeeInfo,
  postEmergency,
  postPersonalInformation,
  getDetailEmployeeInformation,
  getDetailPersonalInformation,
  getDetailCnb
} from '../saga-actions/company-management/employeeActions';
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
  postPersonalInformationFailed,
  employeeInfoDetailFailed,
  employeeInfoDetailRequested,
  employeeInfoDetailSuccess,
  personalInfoDetailFailed,
  personalInfoDetailRequested,
  personalInfoDetailSuccess,
  getDetailCnbFailed,
  getDetailCnbRequested,
  getDetailCnbSuccess
} from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { getCompanyData, checkObject } from '@/utils/helper';


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
    const res: AxiosResponse = yield call(postEmployeeInfo, action?.payload?.employeeInformation);
    if (res.data.code === 201) {
      yield put({ type: postEmployeeInfoSuccess.toString(), payload: res.data.data });
      yield delay(1000);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: res.data.message
        }
      });
      yield delay(1000);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: 0,
          message: null
        }
      });
      if (action?.payload?.isPersonalInformationValid) {
        const body = {
          type: postPersonalInformationRequested.toString(),
          payload: {
            employeeID: res.data.data,
            data: action?.payload?.personalValue
          }
        };
        yield call(fetchPostPersonalInformation, body);
      }

      if (action?.payload?.isEmergencyValid) {
        const body = {
          type: postEmergencyRequested.toString(),
          payload: {
            employeeID: res.data.data,
            data: action?.payload?.emergencyContactValue
          }
        };
        yield call(fetchPostEmergency, body);
      }
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
      return err;
    }
  }
}

function* fetchPostEmergency(action: AnyAction) {
  try {
    const payload = {
      employeeID: String(getCompanyData()?.id),
      primary: {
        name: action?.payload?.data?.fullNamePrimary,
        relationship: action?.payload?.data.relationPrimary,
        phoneNumberPrefix: action?.payload.data.phoneNumberPrefixPrimary,
        phoneNumber: action?.payload.data.phoneNumberPrimary
      },
      secondary: {
        name: action?.payload?.data?.fullNameSecondary,
        relationship: action?.payload?.data.relationSecondary,
        phoneNumberPrefix: action?.payload.data.phoneNumberPrefixSecondary,
        phoneNumber: action?.payload.data.phoneNumberSecondary
      }
    };
    const res: AxiosResponse = yield call(postEmergency, payload);
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: postEmergencySuccess.toString() });
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
    const citizen = {
      countryID: action?.payload?.data.countryCitizenAddress,
      firstLevelCode: action?.payload?.data.provinceCitizenAddress,
      secondLevelCode: action?.payload?.data.cityCitizenAddress,
      thirdLevelCode: action?.payload?.data.subDistrictCitizenAddress,
      address: action?.payload?.data.addressCitizenAddress,
      zipCode: action?.payload?.data.zipCodeCitizenAddress,
      isCitizen: true,
      isResident: action?.payload?.data?.useResidentialAddress,
    };

    const personal = {
      dateOfBirth: dayjs(action?.payload?.data.dateofBirthPersonalInformation).format('YYYY-MM-DD'),
      gender: action?.payload?.data.genderPersonalInformation === 'male' ? 1 : 2,
      maritalStatus: +action?.payload?.data.maritialStatusPersonalInformation,
      numberOfChildren: +action?.payload?.data.numberOfDependantsPersonalInformation,
      countryID: action?.payload?.data.nationalityPersonalInformation,
      religion: +action?.payload?.data.religionPersonalInformation
    };

    const bank = {
      bankID: action?.payload?.data.bankBankInformation,
      holder: action?.payload?.data.bankAccountHolderNameBankInformation,
      accountNumber: action?.payload?.data.bankAccoutNoBankInformation,
      bankCode: action?.payload?.data.bankCodeBankInformation,
      branchCode: action?.payload?.data.branchCodeBankInformation,
      branchName: action?.payload?.data.branchNameBankInformation,
      swiftCode: action?.payload?.data.swiftCodeBankInformation
    };

    const identity = {
      type: +action?.payload?.data.idTypePersonalID,
      number: +action?.payload?.data.idNumberPersonalID,
      expiredAt: dayjs(action?.payload?.data?.idExpirationDatePersonalID).format('YYYY-MM-DD'),
      isPermanent: false
    };

    const residential = {
      countryID: action?.payload?.data.countryResidentialAddress,
      firstLevelCode: action?.payload?.data.provinceResidentialAddress,
      secondLevelCode: action?.payload?.data.cityResidentialAddress,
      thirdLevelCode: action?.payload?.data.subDistrictResidentialAddress,
      address: action?.payload?.data.addressResidentialAddress,
      zipCode: action?.payload?.data.zipCodeResidentialAddress,
      isCitizen: false,
      isResident: action?.payload?.data?.useResidentialAddress
    };

    let payload = {};
    if (checkObject(bank)) {
      payload = {
        ...payload,
        employeeID: action?.payload?.employeeID,
        companyID: String(getCompanyData()?.id),
        citizen: citizen,
        personal: personal,
        identity: identity,
        residential: residential,
      };
    } else {
      payload = {
        ...payload,
        employeeID: action?.payload?.employeeID,
        companyID: String(getCompanyData()?.id),
        citizen: citizen,
        personal: personal,
        identity: identity,
        residential: residential,
        bank: bank
      };
    }
    const res: AxiosResponse = yield call(postPersonalInformation, payload);

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

function* fetchGetEmployeeInformation(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getDetailEmployeeInformation, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: employeeInfoDetailSuccess.toString(),
        payload: {
          data: res?.data?.data
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: employeeInfoDetailFailed.toString() });
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

function* fetchGetPersonalInformationDetail(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getDetailPersonalInformation, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: personalInfoDetailSuccess.toString(),
        payload: {
          data: res?.data?.data
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: personalInfoDetailFailed.toString() });
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

function* fetchGetDetailCnb(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getDetailCnb, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: getDetailCnbSuccess.toString(),
        payload: {
          data: res?.data?.data
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getDetailCnbFailed.toString() });
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

function* employeeSaga() {
  yield takeEvery(getEmployeeRequested.toString(), fetchGetEmployee);
  yield takeEvery(postEmployeeInfoRequested.toString(), fetchPostEmployeeInfo);
  yield takeEvery(postEmergencyRequested.toString(), fetchPostEmergency);
  yield takeEvery(postPersonalInformationRequested.toString(), fetchPostPersonalInformation);
  yield takeEvery(employeeInfoDetailRequested.toString(), fetchGetEmployeeInformation);
  yield takeEvery(personalInfoDetailRequested.toString(), fetchGetPersonalInformationDetail);
  yield takeEvery(getDetailCnbRequested.toString(), fetchGetDetailCnb);
}

export default employeeSaga;