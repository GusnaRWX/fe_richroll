import { createSlice } from '@reduxjs/toolkit';
import { getStorage, setStorages } from '@/utils/storage';
import { HYDRATE } from 'next-redux-wrapper';
import { getTimezone, getSite } from '@/utils/helper';

interface GlobalState {
  language: string;
  site: string;
  timezone: string;
}

const storedLanguage = typeof window !== 'undefined' ? getStorage('lang') : null;
const storedSite = typeof window !== 'undefined' ? getSite() : null;
const storedTimezone = typeof window !== 'undefined' ? getTimezone() : null;

console.log(storedSite, storedTimezone);

const initialState: GlobalState = {
  language: storedLanguage ? storedLanguage as string : 'EN', // default
  site: storedSite ? storedSite : 'Indonesia',
  timezone: storedTimezone ? storedTimezone : 'Asia/Jakarta'
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
    setSite: (state, action) => {
      state.site = action.payload;
      setStorages([
        { name: 'site', value: action.payload }
      ]);
    },
    setTimezone: (state, action) => {
      state.timezone = action.payload;
      setStorages([
        { name: 'timezone', value: action.payload }
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

export const { setLanguage, setSite, setTimezone } = globalSlice.actions;

export default globalSlice.reducer;