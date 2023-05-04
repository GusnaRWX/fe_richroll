import { all } from 'redux-saga/effects';
import exampleSaga from './exampleSaga';
import authSaga from './auth/loginSaga';

export default function* rootSaga() {
  yield all([exampleSaga(), authSaga()]);
}
