import { AnyAction } from '@reduxjs/toolkit';
import {
  getEmployee,
  postEmployeeInfo,
  postEmergency,
  postPersonalInformation,
  getDetailEmployeeInformation,
  getDetailPersonalInformation,
  getDetailCnb,
  postEmployeeCNB,
  getEmployeeEmergencyDetail,
  patchEmployeeInformation,
  patchEmergencyContact,
  patchEmployeePersonal,
  getDetailWorkSchedule,
  postCalculateEvent,
  postSimulationEvent,
  postWorkSchedule,
  getViewWorkSchedule,
  postTerminateEmployee,
  patchWorkSchedule,
  getEmployeeCnb,
  patchEmployeeCnb
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
  employeeInfoDetailRequested,
  employeeInfoDetailSuccess,
  employeeInfoDetailFailed,
  personalInfoDetailRequested,
  personalInfoDetailSuccess,
  personalInfoDetailFailed,
  getDetailCnbRequested,
  getDetailCnbSuccess,
  getDetailCnbFailed,
  postCnbEmployeeRequested,
  postCnbEmployeeSuccess,
  postCnbEmployeeFailed,
  emergencyContactDetailRequested,
  emergencyContactDetailSuccess,
  emergencyContactDetailFailed,
  patchEmployeeInformationRequested,
  patchEmployeeInformationSuccess,
  patchEmployeeInformationFailed,
  patchEmergencyContactRequested,
  patchEmergencyContactSuccess,
  patchEmergencyContactFailed,
  patchPersonalRequested,
  patchPersonalSuccess,
  patchPersonalFailed,
  postCalculateEventRequested,
  postCalculateEventSuccess,
  postCalculateEventFailed,
  postSimulationEventRequested,
  postSimulationEventSuccess,
  postSimulationEventFailed,
  postWorkScheduleRequested,
  postWorkScheduleSuccess,
  postWorkScheduleFailed,
  getDetailWorkScheduleRequested,
  getDetailWorkSchedulerSuccess,
  getDetailWorkSchedulerFailed,
  getViewWorkScheduleRequested,
  getViewWorkScheduleSuccess,
  getViewWorkScheduleFailed,
  postTerminateEmployeeRequested,
  postTerminateEmployeeSuccess,
  postTerminateEmployeeFailed,
  patchWorkScheduleRequested,
  patchWorkScheduleSuccess,
  patchWorkScheduleFailed,
  getEmployeeCnbDetailRequested,
  getEmployeeCnbDetailSuccess,
  getEmployeeCnbDetailFailed,
  patchEmployeeCnbRequested,
  patchEmployeeCnbSuccess,
  patchEmployeeCnbFailed
} from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { Services } from '@/types/axios';
import { AxiosError, AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import Router from 'next/router';
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
      // yield delay(1000);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: res.data.message
        }
      });
      // yield delay(1000);
      // yield put({
      //   type: setResponserMessage.toString(),
      //   payload: {
      //     code: 0,
      //     message: null
      //   }
      // });
      // if (action?.payload?.isPersonalInformationValid) {
      //   const body = {
      //     type: postPersonalInformationRequested.toString(),
      //     payload: {
      //       employeeID: res.data.data,
      //       data: action?.payload?.personalValue
      //     }
      //   };
      //   yield call(fetchPostPersonalInformation, body);
      // }

      // if (action?.payload?.isEmergencyValid) {
      //   const body = {
      //     type: postEmergencyRequested.toString(),
      //     payload: {
      //       employeeID: res.data.data,
      //       data: action?.payload?.emergencyContactValue
      //     }
      //   };
      //   yield call(fetchPostEmergency, body);
      // }

      // if (action?.payload?.isCnbValid) {
      //   const body = {
      //     type: postCnbEmployeeRequested.toString(),
      //     payload: {
      //       employeeID: res?.data?.data,
      //       data: action?.payload?.cnbValue
      //     }
      //   };
      //   yield call(fetchPostCnbEmployee, body);
      // }
      // yield put({
      //   type: postCnbEmployeeRequested.toString(),
      //   payload: {
      //     id: res?.data?.data,
      //     cnb: action?.payload?.cnbValue
      //   }
      // });

      // yield put({
      //   type: postWorkScheduleRequested.toString(),
      //   payload: {
      //     id: res?.data?.data,
      //     workSchedule: action?.payload?.workSchedule
      //   }
      // });
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
      employeeID: action?.payload?.employeeID,
      primary: {
        name: String(action?.payload?.data?.fullNamePrimary),
        relationship: +action?.payload?.data.relationPrimary,
        phoneNumberPrefix: String(action?.payload.data.phoneNumberPrefixPrimary),
        phoneNumber: String(action?.payload.data.phoneNumberPrimary)
      },
      secondary: {
        name: String(action?.payload?.data?.fullNameSecondary),
        relationship: +action?.payload?.data.relationSecondary,
        phoneNumberPrefix: String(action?.payload.data.phoneNumberPrefixSecondary),
        phoneNumber: String(action?.payload.data.phoneNumberSecondary)
      }
    };
    let emergencyPayload = {};
    if (checkObject(payload.secondary)) {
      emergencyPayload = {
        ...emergencyPayload,
        employeeID: payload.employeeID,
        primary: payload.primary
      };
    } else {
      emergencyPayload = {
        ...emergencyPayload,
        employeeID: payload.employeeID,
        primary: payload.primary,
        secondary: payload.secondary
      };
    }
    const res: AxiosResponse = yield call(postEmergency, emergencyPayload);
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
      number: String(action?.payload?.data.idNumberPersonalID),
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
      isCitizen: true,
      isResident: true
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

    if (err instanceof AxiosError) {
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

/**
 * Post CNB Employee
 * @param action
 */
function* fetchPostCnbEmployee(action: AnyAction) {
  try {
    const formatedData = {
      ...(action?.payload?.cnb?.templateID !== '' ? { templateID: action.payload.cnb.templateID } : {}),
      name: action?.payload?.cnb?.name,
      overtime: +action?.payload?.cnb?.overtime,
      base: {
        ...action?.payload?.cnb?.base,
        ...(action?.payload?.cnb?.base?.componentID === '1' && {
          amount: +action?.payload?.cnb?.base?.amount,
          amountType: 0,
          rate: undefined,
          rateType: undefined,
        }),
        ...(action?.payload?.cnb?.base?.componentID === '2' && {
          amount: undefined,
          amountType: undefined,
          rate: +action?.payload?.cnb?.base?.rate,
          rateType: 0
        }),
        ...(action?.payload?.cnb?.base?.componentID === '3' || action?.payload?.cnb?.base?.componentID === '4' ? {
          amount: +action?.payload?.cnb?.base?.amount,
          amountType: 0,
          rate: +action?.payload?.cnb?.base?.rate,
          rateType: 0
        }: {}),
        isTaxable: action?.payload?.cnb?.base?.isTaxable === 'true' ? true : false
      },
      supplementaries: action?.payload?.cnb?.supplementary?.map(val => ({
        ...val,
        amount: +val?.amount,
        amountType: 0,
        rate: val.rate === null ? 0 : +val.rate,
        rateType: 0,
        isTaxable: val?.isTaxable === 'true' ? true : false
      }))
    };

    const payload = {
      employeeID: action?.payload?.id,
      data: formatedData
    };

    const res: AxiosResponse = yield call(postEmployeeCNB, payload);

    if (res?.data?.code === 200 || res?.data?.code === 201) {
      yield put({ type: postCnbEmployeeSuccess.toString() });
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
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postCnbEmployeeFailed.toString() });
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

function* fetchGetEmergencyContactDetail(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getEmployeeEmergencyDetail, action?.payload);
    yield put({
      type: emergencyContactDetailSuccess.toString(),
      payload: {
        data: res?.data?.data
      }
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: emergencyContactDetailFailed.toString() });
      yield put({
        type: setResponserMessage?.toString(),
        payload: {
          code: errorMessage?.code,
          message: errorMessage?.message
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

function* fetchPatchEmployeeInformation(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(patchEmployeeInformation, action?.payload?.employeeInformationPatch);
    if (res.data.code) {
      yield put({ type: patchEmployeeInformationSuccess.toString(), payload: res?.data?.data });
      // const emergencyData = {
      //   type: patchEmergencyContactRequested.toString(),
      //   payload: {
      //     employeeID: action?.payload?.emergencyContactPatch?.employeeID,
      //     emergency: action?.payload?.emergencyContactPatch?.emergency
      //   }
      // };
      // yield call(fetchPatchEmergencyContact, emergencyData);
      yield delay(1000);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: 'Successfully Saved!',
          footerMessage: 'Employee Profile has been updated'
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
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: patchEmployeeInformationFailed.toString() });
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

function* fetchPatchEmergencyContact(action: AnyAction) {
  try {
    const payload = {
      employeeID: action?.payload?.emergencyContactPatch?.employeeID,
      // emergency: {
      // employeeID: action?.payload?.emergencyContactPatch?.employeeID,
      primary: {
        id: action?.payload?.emergencyContactPatch?.emergency?.primaryId,
        name: action?.payload?.emergencyContactPatch?.emergency?.fullNamePrimary,
        relationship: +action?.payload?.emergencyContactPatch?.emergency?.relationPrimary,
        phoneNumberPrefix: action?.payload?.emergencyContactPatch?.emergency?.phoneNumberPrefixPrimary,
        phoneNumber: action?.payload?.emergencyContactPatch?.emergency?.phoneNumberPrimary
      },
      secondary: {
        // id: action?.payload?.emergencyContactPatch?.emergency?.secondaryId ?? '',
        name: action?.payload?.emergencyContactPatch?.emergency?.fullNameSecondary,
        relationship: +action?.payload?.emergencyContactPatch?.emergency?.relationSecondary,
        phoneNumberPrefix: action?.payload?.emergencyContactPatch?.emergency?.phoneNumberPrefixSecondary,
        phoneNumber: action?.payload?.emergencyContactPatch?.emergency?.phoneNumberSecondary
      }
      // }
    };
    let emergencyPayload = {};
    if (checkObject(payload.secondary)) {
      emergencyPayload = {
        ...emergencyPayload,
        employeeID: payload.employeeID,
        primary: payload.primary
      };
    } else {
      emergencyPayload = {
        ...emergencyPayload,
        employeeID: payload.employeeID,
        primary: payload.primary,
        secondary: {
          ...payload.secondary,
          ...(action?.payload?.emergencyContactPatch?.emergency?.secondaryId
            ? { id: action?.payload?.emergencyContactPatch?.emergency?.secondaryId }
            : {}),
        }
      };
    }

    const res: AxiosResponse = yield call(patchEmergencyContact, emergencyPayload);
    if (res.data.code) {
      yield put({ type: patchEmergencyContactSuccess.toString(), payload: res?.data?.data });
      yield delay(1000);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: 'Successfully Saved!',
          footerMessage: 'Employee Profile has been updated'
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
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: patchEmergencyContactFailed.toString() });
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

function* fetchPatchEmployeePersonal(action: AnyAction) {
  console.log(action);
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
      isCitizen: true,
      // isResident: action?.payload?.employeePersonal ? personalPayload..useResidentialAddress
      // isResident: action?.payload?.employeePersonal.personalPayload?.useResidentialAddress
      isResident: true
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
    const res: AxiosResponse = yield call(patchEmployeePersonal, payload);

    if (res.data.code === 200) {
      yield put({ type: patchPersonalSuccess.toString() });
      yield delay(2000);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: 'Successfully Saved!',
          footerMessage: 'Employee Profile has been updated'
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
      yield put({ type: patchPersonalFailed.toString() });
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

function* fetchGetDetailWorkSchedule(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getDetailWorkSchedule, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: getDetailWorkSchedulerSuccess.toString(),
        payload: {
          id: res?.data?.data?.companyWorkScheduleID,
          grossHour: res?.data?.data?.grossHours,
          netHour: res?.data?.data?.netHours,
          events: res?.data?.data?.items
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getDetailWorkSchedulerFailed.toString() });
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

function* fetchPostSimulationEvent(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postSimulationEvent, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: postSimulationEventSuccess.toString(), payload: {
          events: res.data.data
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const error = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postSimulationEventFailed.toString() });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: error?.code,
          message: error?.message
        }
      });
    }
  }
}

function* fetchPostCalculateEvent(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postCalculateEvent, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: postCalculateEventSuccess.toString(),
        payload: {
          grossHour: res.data.data.gross,
          netHour: res.data.data.net
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const error = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postCalculateEventFailed.toString() });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: error?.code,
          message: error?.message
        }
      });
    }
  }
}

function* fetchPostWorkSchedule(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postWorkSchedule, action?.payload);
    if (res.data.code === 201) {
      yield put({ type: postWorkScheduleSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: 'Successfully saved!',
          footerMessage: `Work schedule profile has been created`
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const error = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postWorkScheduleFailed.toString() });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: error?.code,
          message: error?.message
        }
      });
    }
  }
}

function* fetchPatchWorkSchedule(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(patchWorkSchedule, action?.payload);
    if (res.data.code === 200 || res.data.code === 201) {
      yield put({ type: patchWorkScheduleSuccess.toString() });
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: 'Successfully saved!',
          footerMessage: 'Work schedule has been updated'
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const error = err?.response?.data as Services.ErrorResponse;
      yield put({ type: patchWorkScheduleFailed.toString() });
      yield delay(2000, true);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: error?.code,
          message: error?.message
        }
      });
    }
  }
}

function* fetchGetViewWorkSchedule(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getViewWorkSchedule, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: getViewWorkScheduleSuccess.toString(),
        payload: {
          id: res?.data?.data?.companyWorkScheduleID,
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
      yield put({ type: getViewWorkScheduleFailed.toString() });
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

function* fetchPostTerminateEmployee(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(postTerminateEmployee, action?.payload, action?.id);
    if (res.data.code === 200) {
      yield put({
        type: postTerminateEmployeeSuccess.toString(),
        payload: {
          id: res?.data?.data?.company_work_schedule_id,
          status: res?.data?.data?.status,
          message: res?.data?.data?.messages,
        }
      });
      yield Router.back();
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: postTerminateEmployeeFailed.toString() });
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

function* getEmployeeDetailCnb(action: AnyAction) {
  try {
    const res: AxiosResponse = yield call(getEmployeeCnb, action?.payload);
    if (res.data.code === 200) {
      yield put({
        type: getEmployeeCnbDetailSuccess.toString(),
        payload: res?.data?.data
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.response?.data as Services.ErrorResponse;
      yield put({ type: getEmployeeCnbDetailFailed.toString() });
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

function* fetchPatchEmployeeCnb(action: AnyAction) {
  try {
    const employeeCnb = {
      ...(action?.payload?.employeeCnb?.templateID !== '' ? { templateID: action.payload.employeeCnb.templateID } : {}),
      name: action?.payload?.employeeCnb?.name,
      overtime: +action?.payload?.employeeCnb?.overtime,
      base: {
        ...action?.payload?.employeeCnb?.base,
        ...(action?.payload?.employeeCnb?.base?.componentID === '1' && {
          amount: +action?.payload?.employeeCnb?.base?.amount,
          amountType: 0,
          rate: undefined,
          rateType: undefined,
        }),
        ...(action?.payload?.employeeCnb?.base?.componentID === '2' && {
          amount: undefined,
          amountType: undefined,
          rate: +action?.payload?.employeeCnb?.base?.rate,
          rateType: 0
        }),
        ...(action?.payload?.employeeCnb?.base?.componentID === '3' || action?.payload?.employeeCnb?.base?.componentID === '4' ? {
          amount: +action?.payload?.employeeCnb?.base?.amount,
          amountType: 0,
          rate: +action?.payload?.employeeCnb?.base?.rate,
          rateType: 0
        } : {}),
        // amount: +action?.payload?.employeeCnb?.base?.amount,
        // amountType: 0,
        // rate: action?.payload?.employeeCnb?.base?.rate === null ? 0 : +action?.payload?.employeeCnb?.base?.rate,
        // rateType: action?.payload?.employeeCnb?.base?.rateType === null ? 0 : +action?.payload?.employeeCnb?.base?.rateType,
        isTaxable: action?.payload?.employeeCnb?.base?.isTaxable === 'true' ? true : false
      },
      supplementaries: action?.payload?.employeeCnb?.supplementary?.map(val => ({
        ...val,
        amount: +val?.amount,
        amountType:0,
        rate: val.rate === null ? 0 : +val.rate,
        rateType: val.rateType === null ? 0 : +val?.rateType,
        isTaxable: val?.isTaxable === 'true' ? true : false
      }))
    };
    const id = action?.payload?.id;

    const payload = {
      id: id,
      employeeCnb: employeeCnb
    };

    const res: AxiosResponse = yield call(patchEmployeeCnb, payload);

    if (res.data.code === 201 || res.data.code === 200) {
      yield put({ type: patchEmployeeCnbSuccess.toString() });
      yield delay(1000);
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res?.data?.code,
          message: 'Successfully Saved!',
          footerMessage: 'Employee Cnb has been updated'
        }
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage = err?.request?.data as Services.ErrorResponse;
      yield put({ type: patchEmployeeCnbFailed.toString() });
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
  yield takeEvery(postPersonalInformationRequested.toString(), fetchPostPersonalInformation);
  yield takeEvery(postEmergencyRequested.toString(), fetchPostEmergency);
  yield takeEvery(postCnbEmployeeRequested.toString(), fetchPostCnbEmployee);
  yield takeEvery(postWorkScheduleRequested.toString(), fetchPostWorkSchedule);
  yield takeEvery(employeeInfoDetailRequested.toString(), fetchGetEmployeeInformation);
  yield takeEvery(personalInfoDetailRequested.toString(), fetchGetPersonalInformationDetail);
  yield takeEvery(getDetailCnbRequested.toString(), fetchGetDetailCnb);
  yield takeEvery(emergencyContactDetailRequested.toString(), fetchGetEmergencyContactDetail);
  yield takeEvery(patchEmployeeInformationRequested.toString(), fetchPatchEmployeeInformation);
  yield takeEvery(patchEmergencyContactRequested.toString(), fetchPatchEmergencyContact);
  yield takeEvery(patchPersonalRequested.toString(), fetchPatchEmployeePersonal);
  yield takeEvery(getDetailWorkScheduleRequested.toString(), fetchGetDetailWorkSchedule);
  yield takeEvery(postSimulationEventRequested.toString(), fetchPostSimulationEvent);
  yield takeEvery(postCalculateEventRequested.toString(), fetchPostCalculateEvent);
  yield takeEvery(getViewWorkScheduleRequested.toString(), fetchGetViewWorkSchedule);
  yield takeEvery(postTerminateEmployeeRequested.toString(), fetchPostTerminateEmployee);
  yield takeEvery(patchWorkScheduleRequested.toString(), fetchPatchWorkSchedule);
  yield takeEvery(getEmployeeCnbDetailRequested.toString(), getEmployeeDetailCnb);
  yield takeEvery(patchEmployeeCnbRequested.toString(), fetchPatchEmployeeCnb);
}

export default employeeSaga;