import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface TableState {
    loading: boolean;
    data: [];
}

const initialState : TableState = {
    loading: false,
    data: []
}