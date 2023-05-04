import { Reducer, combineReducers } from '@reduxjs/toolkit';
import exampleSlice from './slice/exampleSlice';
import responserSlice from './slice/responserSlice';
import LoginSlice from './slice/auth/loginSlice';
import optionSlice from './slice/options/optionSlice';
import registerSlice from './slice/auth/registerSlice';


const reducers: Reducer = combineReducers({
  example: exampleSlice,
  responser: responserSlice,
  login: LoginSlice,
  option: optionSlice,
  register: registerSlice
});

export default reducers;
