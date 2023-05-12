import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface OptionState {
  loading: boolean,
  countries: Array<{ label: string; value: string }>,
  administrativeFirst: Array<{ label: string; value: string }>
  administrativeSecond: Array<{ label: string; value: string }>
  administrativeThird: Array<{ label: string; value: string }>,
  banks: Array<{ label: string, value: string }>
}

const initialState: OptionState = {
  loading: false,
  countries: [],
  administrativeFirst: [],
  administrativeSecond: [],
  administrativeThird: [],
  banks: []
};

export const optionSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    countriesRequested: (state) => {
      state.loading = true;
    },
    countriesSuccess: (state, action) => {
      state.loading = false;
      state.countries = action?.payload?.items?.map(item => {
        return {
          label: item.name,
          value: item.id
        };
      });
    },
    countriesFailed: (state) => {
      state.loading = false;
    },
    administrativeFirstLevelRequested: (state) => {
      state.loading = true;
    },
    administrativeFirstLevelSuccess: (state, action) => {
      state.loading = false;
      state.administrativeFirst = action?.payload?.items?.map(item => {
        return {
          label: item.name,
          value: item.code
        };
      });
    },
    administrativeFirstLevelFailed: (state) => {
      state.loading = false;
    },
    administrativeSecondLevelRequested: (state) => {
      state.loading = true;
    },
    administrativeSecondLevelSuccess: (state, action) => {
      state.loading = false;
      state.administrativeSecond = action?.payload?.items.map(item => {
        return {
          label: item.name,
          value: item.code
        };
      });
    },
    administrativeSecondLevelFailed: (state) => {
      state.loading = false;
    },
    administrativeThirdLevelRequsted: (state) => {
      state.loading = true;
    },
    administrativeThirdLevelSuccess: (state, action) => {
      state.loading = false;
      state.administrativeThird = action?.payload?.items.map(item => {
        return {
          label: item.name,
          value: item.code
        };
      });
    },
    administrativeThirdLevelFailed: (state) => {
      state.loading = false;
    },
    getBanksRequested: (state) => {
      state.loading = true;
    },
    getBanksSuccess: (state, action) => {
      state.loading = false;
      state.banks = action?.payload?.items.map(item => {
        return {
          label: item.alias,
          value: item.id
        };
      });
    },
    getBanksFailed: (state) => {
      state.loading = false;
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
  countriesRequested,
  countriesSuccess,
  countriesFailed,
  administrativeFirstLevelRequested,
  administrativeFirstLevelSuccess,
  administrativeFirstLevelFailed,
  administrativeSecondLevelRequested,
  administrativeSecondLevelSuccess,
  administrativeSecondLevelFailed,
  administrativeThirdLevelRequsted,
  administrativeThirdLevelSuccess,
  administrativeThirdLevelFailed,
  getBanksRequested,
  getBanksSuccess,
  getBanksFailed
} = optionSlice.actions;

export default optionSlice.reducer;