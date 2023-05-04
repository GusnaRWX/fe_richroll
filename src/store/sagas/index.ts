import { all } from 'redux-saga/effects';
import exampleSaga from './exampleSaga';
import authSaga from './auth/loginSaga';
import optionSaga from './optionSaga';

export default function* rootSaga() {
  yield all([exampleSaga(), authSaga(), optionSaga()]);
}
