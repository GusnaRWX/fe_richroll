import { all } from 'redux-saga/effects';
import authSaga from './auth/loginSaga';
import optionSaga from './optionSaga';
import registerSaga from './auth/registerSaga';
import employeeSaga from './company-management/employeeSaga';
import departmentSaga from './company-management/departmentSaga';
import companySaga from './company/companySaga';
import cnbSaga from './cnb/compensationSaga';

export default function* rootSaga() {
  yield all([authSaga(), optionSaga(), registerSaga(), employeeSaga(), departmentSaga(), companySaga(), cnbSaga()]);
}
