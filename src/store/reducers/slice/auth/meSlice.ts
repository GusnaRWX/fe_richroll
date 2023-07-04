import { setStorages } from '@/utils/storage';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface MeState {
  profile: {
    name: string;
    email: string;
    roles: string[] | null
  }
}

const site = 'Indonesia';
const timezone = 'Asia/Indonesia';

const initialState: MeState = {
  profile: {
    name: '',
    email: '',
    roles: null
  }
};

export const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    meSuccessed: (state, action) => {
      setStorages([
        { name: 'user', value: JSON.stringify({ ...action.payload }) },
        { name: 'site', value: JSON.stringify(site) },
        { name: 'timezone', value: JSON.stringify(timezone) }
      ]);
      state.profile = { ...action.payload };
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

export const {
  meSuccessed
} = meSlice.actions;

export default meSlice.reducer;