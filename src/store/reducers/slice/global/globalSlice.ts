import { createSlice } from '@reduxjs/toolkit';
import { getStorage, setStorages } from '@/utils/storage';
import { HYDRATE } from 'next-redux-wrapper';

interface GlobalState {
  language: string
}

const initialState: GlobalState = {
  language: '' // default
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
    },
    getLanguage: (state) => {
      const getLanguage = getStorage('lang');
      state.language = getLanguage as string;
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

export const { setLanguage, getLanguage } = globalSlice.actions;

export default globalSlice.reducer;