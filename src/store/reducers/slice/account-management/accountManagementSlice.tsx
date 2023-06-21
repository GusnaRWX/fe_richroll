import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { Account } from '@/types/account';

interface AccountState {
  isLoading: boolean;
  data: Array<Account.AccountType>;
  isErrorInput: boolean;
}

const initialState: AccountState = {
  isLoading: false,
  data: [],
  isErrorInput: false
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    // get, suspend, delete, reactivate account
    getAccountRequested: (state) => {
      state.isLoading = true;
    },
    getAccountSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action?.payload.data;
    },
    getAccountFailed: (state) => {
      state.isLoading = false;
    },
    patchAccountSuspensionRequested: (state) => {
      state.isLoading = true;
    },
    patchAccountSuspensionSuccess: (state) => {
      state.isLoading = false;
    },
    patchAccountSuspensionFailed: (state) => {
      state.isLoading = false;
    },
    putAccountDeleteRequested: (state) => {
      state.isLoading = true;
    },
    putAccountDeleteSuccess: (state) => {
      state.isLoading = false;
    },
    putAccountDeleteFailed: (state) => {
      state.isLoading = false;
    },
    putAccountReactiveRequested: (state) => {
      state.isLoading = true;
    },
    putAccountReactiveSuccess: (state) => {
      state.isLoading = false;
    },
    putAccountReactiveFailed: (state) => {
      state.isLoading = false;
    },
    putEmployeeAccountDeletionRequested: (state) => {
      state.isLoading = true;
    },
    putEmployeeAccountDeletionSuccess: (state) => {
      state.isLoading = false;
      state.isErrorInput = false;
    },
    putEmployeeAccountDeletionFailed: (state, action) => {
      state.isLoading = false;
      if (action?.payload?.code === 409) {
        state.isErrorInput = true;
      }
    }
    // end
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
  getAccountRequested,
  getAccountSuccess,
  getAccountFailed,
  patchAccountSuspensionRequested,
  patchAccountSuspensionSuccess,
  patchAccountSuspensionFailed,
  putAccountDeleteRequested,
  putAccountDeleteSuccess,
  putAccountDeleteFailed,
  putAccountReactiveRequested,
  putAccountReactiveSuccess,
  putAccountReactiveFailed,
  putEmployeeAccountDeletionFailed,
  putEmployeeAccountDeletionRequested,
  putEmployeeAccountDeletionSuccess
} = accountSlice.actions;

export default accountSlice.reducer;