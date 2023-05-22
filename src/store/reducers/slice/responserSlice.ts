import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface ResponseType {
  code: number;
  message: string | null;
  footerMessage?: string;
}

const initialState: ResponseType = {
  code: 0,
  message: null,
  footerMessage: ''
};

export const responseSlice = createSlice({
  name: 'responser',
  initialState,
  reducers: {
    setResponserMessage(state, action) {
      state.code = action?.payload?.code;
      state.message = action?.payload?.message;
      state.footerMessage = action?.payload?.footerMessage;
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
