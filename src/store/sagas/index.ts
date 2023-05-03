import { all } from 'redux-saga/effects';
import exampleSaga from './exampleSaga';

export default function* rootSaga() {
  yield all([exampleSaga()]);
}
