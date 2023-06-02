import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface DepartmentState {
  loading: boolean
}

const initialState:DepartmentState = {
  loading: false
};

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    postDepartmentRequested: (state) => {
      state.loading = true;
    },
    postDepartmentSuccess: (state) => {
      state.loading = false;
    },
    postDepartmentFailed: (state) => {
      state.loading = false;
    },
    patchDepartmentRequested: (state) => {
      state.loading = true;
    },
    patchDepartmentSuccess: (state) => {
      state.loading = false;
    },
    patchDepartmentFailed: (state) => {
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
  postDepartmentRequested,
  postDepartmentSuccess,
  postDepartmentFailed,
  patchDepartmentRequested,
  patchDepartmentSuccess,
  patchDepartmentFailed
} = departmentSlice.actions;

export default departmentSlice.reducer;