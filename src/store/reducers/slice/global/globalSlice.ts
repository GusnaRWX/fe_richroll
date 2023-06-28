import { createSlice } from '@reduxjs/toolkit';
import { getStorage, setStorages } from '@/utils/storage';
import { HYDRATE } from 'next-redux-wrapper';

interface GlobalState {
  language: string
}

const storedLanguage = typeof window !== 'undefined' ? getStorage('lang') : null;

const initialState: GlobalState = {
  language: storedLanguage ? storedLanguage as string : 'EN' // default
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      setStorages([
        { name: 'lang', value: action.payload }
      ]);
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    }
  }
});

export const { setLanguage } = globalSlice.actions;

export default globalSlice.reducer;