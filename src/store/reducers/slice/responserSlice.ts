import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface ResponseType {
  code: number;
  message: string | null;
}

const initialState: ResponseType = {
  code: 0,
  message: null,
};

export const responseSlice = createSlice({
  name: 'responser',
  initialState,
  reducers: {
    setResponserMessage(state, action) {
      state.code = action?.payload?.code;
      state.message = action?.payload?.message;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.responser,
      };
    },
  },
});

export const { setResponserMessage } = responseSlice.actions;

export default responseSlice.reducer;
