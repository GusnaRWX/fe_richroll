import { all } from 'redux-saga/effects';
import authSaga from './auth/loginSaga';
import optionSaga from './optionSaga';
import registerSaga from './auth/registerSaga';
import employeeSaga from './company-management/employeeSaga';
import departmentSaga from './company-management/departmentSaga';
import companySaga from './company/companySaga';
import cnbSaga from './cnb/compensationSaga';
import workScheduleSaga from './company-management/workScheduleSaga';
import annualScheduleSaga from './company-management/annualScheduleSaga';
import employmentSaga from './employment/employmentSaga';
import accountSaga from './account-management/accountManagementSaga';
import attendanceEntriesSaga from './attendance-leave/attendanceEntriesSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    optionSaga(),
    registerSaga(),
    employeeSaga(),
    departmentSaga(),
    companySaga(),
    cnbSaga(),
    workScheduleSaga(),
    annualScheduleSaga(),
    employmentSaga(),
    accountSaga(),
    attendanceEntriesSaga()
  ]);
}
