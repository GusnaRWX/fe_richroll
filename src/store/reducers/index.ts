import { Reducer, combineReducers } from '@reduxjs/toolkit';
import exampleSlice from './slice/exampleSlice';
import responserSlice from './slice/responserSlice';
import LoginSlice from './slice/auth/loginSlice';


const reducers: Reducer = combineReducers({
  example: exampleSlice,
  responser: responserSlice,
  login: LoginSlice
});

export default reducers;
