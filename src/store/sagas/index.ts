import { all } from 'redux-saga/effects';
import exampleSaga from './exampleSaga';
import authSaga from './auth/loginSaga';
import optionSaga from './optionSaga';
import registerSaga from './auth/registerSaga';
import employeeSaga from './company-management/employeeSaga';

export default function* rootSaga() {
  yield all([exampleSaga(), authSaga(), optionSaga(), registerSaga(), employeeSaga()]);
}
