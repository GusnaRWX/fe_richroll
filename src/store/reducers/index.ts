import { combineReducers } from "@reduxjs/toolkit";
import exampleSlice from "./slice/exampleSlice";
import responserSlice from "./slice/responserSlice";

const reducers = combineReducers({
  example: exampleSlice,
  responser: responserSlice,
});

export default reducers;
