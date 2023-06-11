import { AnyAction } from '@reduxjs/toolkit';
import {
  getDetailCnb,
  getDetailInformation,
  getDetailEmergencyContact,
  getUserWorkSchedule,
  getDetailPersonalInfo,
  patchEmergencyContact,
  patchInformation,
  patchPersonalInfo
} from '../saga-actions/employment/employmentActions';
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import {
  getDetailCnbRequested,
  getDetailCnbSuccess,
  getDetailCnbFailed,
  getDetailEmergencyContactFailed,
  getDetailEmergencyContactRequested,
  getDetailEmergencyContactSuccess,
  getDetailInformationFailed,
  getDetailInformationRequested,
  getDetailInformationSuccess,
  getDetailPersonalInfoFailed,
  getDetailPersonalInfoRequested,
  getDetailPersonalInfoSuccess,
  getUserWorkScheduleFailed,
  getUserWorkScheduleRequested,
  getUserWorkScheduleSuccess,
  patchDetailEmergencyContactFailed,
  patchDetailEmergencyContactRequested,
  patchDetailEmergencyContactSuccess,
  patchDetailInformationFailed,
  patchDetailInformationRequested,
  patchDetailInformationSuccess,
  patchDetailPersonalInfoFailed,
  patchDetailPersonalInfoRequested,
  patchDetailPersonalInfoSuccess
} from '@/store/reducers/slice/employment/employmentSlice';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { getCompanyData, checkObject } from '@/utils/helper';


function* fetchGetEmploymentInformation() {
  try {
    const res: AxiosResponse = yield call(getDetailInformation);
    if (res.data.code === 200) {
      yield put({
        type: getDetailInformationSuccess.toString(),
        payload: {
          data: res?.data?.data
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getDetailInformationFailed.toString() });
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

function* fetchGetEmploymentPersonalInfo() {
  try {
    const res: AxiosResponse = yield call(getDetailPersonalInfo);
    if (res.data.code === 200) {
      yield put({
        type: getDetailPersonalInfoSuccess.toString(),
        payload: {
          data: res?.data?.data
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getDetailPersonalInfoFailed.toString() });
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

function* fetchGetEmploymentEmergencyContact() {
  try {
    const res: AxiosResponse = yield call(getDetailEmergencyContact);
    if (res.data.code === 200) {
      yield put({
        type: getDetailEmergencyContactSuccess.toString(),
        payload: {
          data: res?.data?.data
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getDetailEmergencyContactFailed.toString() });
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

function* fetchGetEmploymentCnb() {
  try {
    const res: AxiosResponse = yield call(getDetailCnb);
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

function* fetchPatchEmploymentInformation(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(patchInformation, action?.payload);
    if (res.data.code === '200' || res.data.code === '201') {
      yield put({ type: patchDetailInformationSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: res?.data?.message
        }
      });
    }
  } catch(err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: patchDetailInformationFailed.toString() });
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

function* fetchPatchEmploymentPersonal(action: AnyAction) {
  try {
    const citizen = {
      countryID: action?.payload?.employeePersonal.personalPayload.countryCitizenAddress,
      firstLevelCode: action?.payload?.employeePersonal.personalPayload.provinceCitizenAddress,
      secondLevelCode: action?.payload?.employeePersonal.personalPayload.cityCitizenAddress,
      thirdLevelCode: action?.payload?.employeePersonal.personalPayload.subDistrictCitizenAddress,
      address: action?.payload?.employeePersonal.personalPayload.addressCitizenAddress,
      zipCode: action?.payload?.employeePersonal.personalPayload.zipCodeCitizenAddress,
      isCitizen: true,
      // isResident: action?.payload?.employeePersonal ? personalPayload..useResidentialAddress,
      isResident: action?.payload?.employeePersonal.personalPayload.useResidentialAddress
    };

    const personal = {
      dateOfBirth: dayjs(action?.payload?.employeePersonal.personalPayload.dateofBirthPersonalInformation).format('YYYY-MM-DD'),
      gender: action?.payload?.employeePersonal.personalPayload.genderPersonalInformation === 'male' ? 1 : 2,
      maritalStatus: +action?.payload?.employeePersonal.personalPayload.maritialStatusPersonalInformation,
      numberOfChildren: +action?.payload?.employeePersonal.personalPayload.numberOfDependantsPersonalInformation,
      countryID: action?.payload?.employeePersonal.personalPayload.nationalityPersonalInformation,
      religion: +action?.payload?.employeePersonal.personalPayload.religionPersonalInformation
    };

    const bank = {
      bankID: action?.payload?.employeePersonal.personalPayload.bankBankInformation,
      holder: action?.payload?.employeePersonal.personalPayload.bankAccountHolderNameBankInformation,
      accountNumber: action?.payload?.employeePersonal.personalPayload.bankAccoutNoBankInformation,
      bankCode: action?.payload?.employeePersonal.personalPayload.bankCodeBankInformation,
      branchCode: action?.payload?.employeePersonal.personalPayload.branchCodeBankInformation,
      branchName: action?.payload?.employeePersonal.personalPayload.branchNameBankInformation,
      swiftCode: action?.payload?.employeePersonal.personalPayload.swiftCodeBankInformation
    };

    const identity = {
      type: +action?.payload?.employeePersonal.personalPayload.idTypePersonalID,
      number: String(action?.payload?.employeePersonal.personalPayload.idNumberPersonalID),
      // expiredAt: dayjs(action?.payload?.employeePersonal ? personalPayload..idExpirationDatePersonalID).format('YYYY-MM-DD'),
      expiredAt: dayjs(action?.payload?.employeePersonal?.personalPayload.idExpirationDatePersonalID).format('YYYY-MM-DD'),
      isPermanent: false
    };

    const residential = {
      countryID: action?.payload?.employeePersonal.personalPayload.countryResidentialAddress,
      firstLevelCode: action?.payload?.employeePersonal.personalPayload.provinceResidentialAddress,
      secondLevelCode: action?.payload?.employeePersonal.personalPayload.cityResidentialAddress,
      thirdLevelCode: action?.payload?.employeePersonal.personalPayload.subDistrictResidentialAddress,
      address: action?.payload?.employeePersonal.personalPayload.addressResidentialAddress,
      zipCode: action?.payload?.employeePersonal.personalPayload.zipCodeResidentialAddress,
      isCitizen: false,
      // isResident: action?.payload?.employeePersonal ? personalPayload..useResidentialAddress
      isResident: action?.payload?.employeePersonal.personalPayload?.useResidentialAddress
    };

    let payload = {};
    if (checkObject(bank)) {
      payload = {
        ...payload,
        employeeID: action?.payload?.employeePersonal.employeeID,
        companyID: String(getCompanyData()?.id),
        citizen: citizen,
        personal: personal,
        identity: identity,
        residential: residential,
      };
    } else {
      payload = {
        ...payload,
        employeeID: action?.payload?.employeePersonal.employeeID,
        companyID: String(getCompanyData()?.id),
        citizen: citizen,
        personal: personal,
        identity: identity,
        residential: residential,
        bank: bank
      };
    }
    const res: AxiosResponse = yield call(patchPersonalInfo, payload);

    if (res.data.code === 200) {
      yield put({ type: patchDetailPersonalInfoSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: res?.data?.message
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: patchDetailPersonalInfoFailed.toString() });
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

function* fetchPatchEmploymentEmergency(action: AnyAction) {
  try {
    const payload = {
      employeeID: action?.payload?.emergencyContactPatch?.employeeID,
      primary: {
        id: action?.payload?.emergencyContactPatch?.emergency?.primaryId,
        name: action?.payload?.emergencyContactPatch?.emergency?.fullNamePrimary,
        relationship: +action?.payload?.emergencyContactPatch?.emergency?.relationPrimary,
        phoneNumberPrefix: action?.payload?.emergencyContactPatch?.emergency?.phoneNumberPrefixPrimary,
        phoneNumber: action?.payload?.emergencyContactPatch?.emergency?.phoneNumberPrimary
      },
      secondary: {
        id: action?.payload?.emergencyContactPatch?.emergency?.secondaryId,
        name: action?.payload?.emergencyContactPatch?.emergency?.fullNameSecondary,
        relationship: +action?.payload?.emergencyContactPatch?.emergency?.relationSecondary,
        phoneNumberPrefix: action?.payload?.emergencyContactPatch?.emergency?.phoneNumberPrefixSecondary,
        phoneNumber: action?.payload?.emergencyContactPatch?.emergency?.phoneNumberSecondary
      }

    };
    const res: AxiosResponse = yield call(patchEmergencyContact, payload);
    if (res.data.code) {
      yield put({ type: patchDetailEmergencyContactSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: res?.data?.message
        }
      });
    }
  }catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: patchDetailEmergencyContactFailed.toString() });
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

function* fetchGetEmploymentWorkSchedule() {
  try {
    const res: AxiosResponse = yield call(getUserWorkSchedule);
    if (res.data.code === 200) {
      yield put({
        type: getUserWorkScheduleSuccess.toString(),
        payload: {
          name: res?.data?.data?.name,
          grossHour: res?.data?.data?.grossHours,
          netHour: res?.data?.data?.netHours,
          events: res?.data?.data?.items
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getUserWorkScheduleFailed.toString() });
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

function* employmentSaga() {
  yield takeEvery(getDetailInformationRequested.toString(), fetchGetEmploymentInformation);
  yield takeEvery(getDetailPersonalInfoRequested.toString(), fetchGetEmploymentPersonalInfo);
  yield takeEvery(getDetailEmergencyContactRequested.toString(), fetchGetEmploymentEmergencyContact);
  yield takeEvery(getDetailCnbRequested.toString(), fetchGetEmploymentCnb);
  yield takeEvery(patchDetailInformationRequested.toString(), fetchPatchEmploymentInformation);
  yield takeEvery(patchDetailPersonalInfoRequested.toString(), fetchPatchEmploymentPersonal);
  yield takeEvery(patchDetailEmergencyContactRequested.toString(), fetchPatchEmploymentEmergency);
  yield takeEvery(getUserWorkScheduleRequested.toString(), fetchGetEmploymentWorkSchedule);
}

export default employmentSaga;
