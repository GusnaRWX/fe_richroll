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
  listCnb: Array<{ label: string, value: number | string }>
  listBaseCompensation: Array<{ label: string, value: string | number, type: string | number }>
  listSuppCompensation: Array<{ label: string, value: string | number, type: string | number }>
  listTermin: Array<{ label: string, value: string | number }>
  listSuppTermin: Array<Array<{ label: string | number, value: string | number }>>,
  listCompensationBenefits: {
    label?: string,
    value?: string,
    base?: [],
    supplementaries?: []
  }
  // listCnb: Array<{label: string, value: number| string}>
  // listCompensation: Array<{label: string, value: string | number, type: string | number }>
  // listTermin: Array<{label: string, value: string | number}>
  // listSuppTermin: Array<Array<{label: string | number, value: string | number}>>
  listWorkSchedule: Array<{ label: string, value: string | number }>
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
  secondAdministrativeThird: [],
  listCnb: [],
  listBaseCompensation: [],
  listSuppCompensation: [],
  listTermin: [],
  listSuppTermin: [[]],
  listCompensationBenefits: {},
  listWorkSchedule: []
};

const returnNameId = (item) => {
  return {
    label: item.name,
    value: item.id
  };
};

const returnNameCode = (item) => {
  return {
    label: item.name,
    value: item.code
  };
};

const returnCompensationId = (item) => {
  return {
    label: item.name,
    value: item.id,
    type: item.type
  };
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
        return returnNameId(item);
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
        return returnNameCode(item);
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
        return returnNameCode(item);
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
        return returnNameCode(item);
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
        return returnNameId(item);
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
        return returnNameId(item);
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
        return returnNameId(item);
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
        return returnNameCode(item);
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
        return returnNameCode(item);
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
        return returnNameCode(item);
      });
    },
    getSecondAdministrativeThirdLevelFailed: (state) => {
      state.loading = false;
    },
    getListCnbRequested: (state) => {
      state.loading = true;
    },
    getListCnbSuccess: (state, action) => {
      state.loading = false;
      state.listCnb = action?.payload?.items?.map(item => {
        return returnNameId(item);
      });
      state.listCompensationBenefits = action?.payload?.items?.map(item => {
        return {
          label: item.name,
          value: item.id,
          base: item.base,
          supplementaries: item.supplementaries
        };
      });
    },
    getListCnbFailed: (state) => {
      state.loading = false;
    },
    getListBaseCompensationRequested: (state) => {
      state.loading = true;
    },
    getListBaseCompensationSuccess: (state, action) => {
      state.loading = false;
      state.listBaseCompensation = action?.payload?.items?.map(item => {
        return returnCompensationId(item);
      });
    },
    getListBaseCompensationFailed: (state) => {
      state.loading = false;
    },
    getListSuppCompensationRequested: (state) => {
      state.loading = true;
    },
    getListSuppCompensationSuccess: (state, action) => {
      state.loading = false;
      state.listSuppCompensation = action?.payload?.items?.map(item => {
        return returnCompensationId(item);
      });
    },
    getListSuppCompensationFailed: (state) => {
      state.loading = false;
    },
    getListTerminReqeusted: (state) => {
      state.loading = true;
    },
    getListTerminSuccess: (state, action) => {
      state.loading = false;
      state.listTermin = action?.payload?.items?.map(item => {
        return returnNameId(item);
      });
    },
    getListTerminFailed: (state) => {
      state.loading = false;
    },
    getListSuppTerminRequested: (state) => {
      state.loading = true;
    },
    getListSuppTerminSuccess: (state, action) => {
      const data: Array<{ label: string | number, value: string | number }> = [];
      state.loading = false;
      if (state.listSuppTermin[0].length === 0) {
        state.listSuppTermin.splice(0, 1);
        action?.payload?.items?.map((item) => {
          data.push({
            label: item.name,
            value: item.id
          });
        });
        state.listSuppTermin.push(data);
      } else {
        action?.payload?.items?.map(item => {
          data.push({
            label: item.name,
            value: item.id
          });
        });
        state.listSuppTermin.push(data);
      }
    },
    getListSuppTerminFailed: (state) => {
      state.loading = false;
    },
    removeListSuppTermin: (state, action) => {
      state.listSuppTermin.slice(action?.payload, 1);
    },
    getListOptionWorkScheduleRequested: (state) => {
      state.loading = true;
    },
    getListOptionWorkScheduleSuccess: (state, action) => {
      const data: Array<{ label: string, value: string | number }> = [];
      action?.payload?.items?.map(item => {
        data.push({
          label: item.name,
          value: item.id
        });
      });
      state.listWorkSchedule = data;
    },
    getListOptionWorkScheduleFailed: (state) => {
      state.loading = false;
    },
    resetListWorkSchedule: (state) => {
      state.listWorkSchedule = [];
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
  getSecondAdministrativeThirdLevelFailed,
  getListCnbRequested,
  getListCnbFailed,
  getListCnbSuccess,
  getListBaseCompensationFailed,
  getListBaseCompensationSuccess,
  getListBaseCompensationRequested,
  getListSuppCompensationFailed,
  getListSuppCompensationSuccess,
  getListSuppCompensationRequested,
  getListTerminFailed,
  getListTerminReqeusted,
  getListTerminSuccess,
  getListSuppTerminFailed,
  getListSuppTerminRequested,
  getListSuppTerminSuccess,
  removeListSuppTermin,
  getListOptionWorkScheduleFailed,
  getListOptionWorkScheduleRequested,
  getListOptionWorkScheduleSuccess,
  resetListWorkSchedule
} = optionSlice.actions;

export default optionSlice.reducer;