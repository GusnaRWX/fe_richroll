import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface OptionState {
  loading: boolean,
  countries: Array<{ label: string; value: string }>,
  administrativeFirst: Array<{ label: string; value: string }>
  administrativeSecond: Array<{ label: string; value: string }>
  administrativeThird: Array<{ label: string; value: string }>,
  secondAdministrativeFirst: Array<{ label: string; value: string }>
  secondAdministrativeSecond: Array<{ label: string; value: string }>
  secondAdministrativeThird: Array<{ label: string; value: string }>,
  banks: Array<{ label: string, value: string }>
  listDepartment: Array<{ label: string, value: string }>
  listPosition: Array<{ label: string, value: string }>
}

const initialState: OptionState = {
  loading: false,
  countries: [],
  administrativeFirst: [],
  administrativeSecond: [],
  administrativeThird: [],
  banks: [],
  listDepartment: [],
  listPosition: [],
  secondAdministrativeFirst: [],
  secondAdministrativeSecond: [],
  secondAdministrativeThird: []
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
    },
    getListDepartmentRequested: (state) => {
      state.loading = true;
    },
    getListDepartmentSuccess: (state, action) => {
      state.loading = false;
      state.listDepartment = action?.payload?.items.map(item => {
        return {
          label: item.name,
          value: item.id
        };
      });
    },
    getListDepartmentFailed: (state) => {
      state.loading = false;
    },
    getListPositionRequested: (state) => {
      state.loading = true;
    },
    getListPositionSuccess: (state, action) => {
      state.loading = false;
      state.listPosition = action?.payload.items.map(item => {
        return {
          label: item.name,
          value: item.id
        };
      });
    },
    getListPositionFailed: (state) => {
      state.loading = false;
    },
    getSecondAdministrativeFirstLevelRequested: (state) => {
      state.loading = true;
    },
    getSecondAdministrativeFirstLevelSuccess: (state, action) => {
      state.loading = false;
      state.secondAdministrativeFirst = action?.payload?.items?.map(item => {
        return {
          label: item.name,
          value: item.code
        };
      });
    },
    getSecondAdministrativeFirstLevelFailed: (state) => {
      state.loading = false;
    },
    getSecondAdministrativeSecondLevelRequested: (state) => {
      state.loading = true;
    },
    getSecondAdministrativeSecondLevelSuccess: (state, action) => {
      state.loading = false;
      state.secondAdministrativeSecond = action?.payload?.items?.map(item => {
        return {
          label: item.name,
          value: item.code
        };
      });
    },
    getSecondAdministrativeSecondLevelFailed: (state) => {
      state.loading = false;
    },
    getSecondAdministrativeThirdLevelRequested: (state) => {
      state.loading = true;
    },
    getSecondAdministrativeThirdLevelSuccess: (state, action) => {
      state.loading = false;
      state.secondAdministrativeThird = action?.payload?.items?.map(item => {
        return {
          label: item.name,
          value: item.code
        };
      });
    },
    getSecondAdministrativeThirdLevelFailed: (state) => {
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
  getBanksFailed,
  getListDepartmentRequested,
  getListDepartmentSuccess,
  getListDepartmentFailed,
  getListPositionRequested,
  getListPositionSuccess,
  getListPositionFailed,
  getSecondAdministrativeFirstLevelRequested,
  getSecondAdministrativeFirstLevelSuccess,
  getSecondAdministrativeFirstLevelFailed,
  getSecondAdministrativeSecondLevelRequested,
  getSecondAdministrativeSecondLevelSuccess,
  getSecondAdministrativeSecondLevelFailed,
  getSecondAdministrativeThirdLevelRequested,
  getSecondAdministrativeThirdLevelSuccess,
  getSecondAdministrativeThirdLevelFailed
} = optionSlice.actions;

export default optionSlice.reducer;