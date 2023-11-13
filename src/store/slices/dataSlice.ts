import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_COUNT, DEFAULT_PAGE } from '../../constants';
import { DataState } from './types';

const initialState: DataState = {
  data: [],
  isLoading: false,
  page: DEFAULT_PAGE,
  count: DEFAULT_COUNT,
  searchValue: '',
};

const dataSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    fetchData: (state, action) => {
      state.data = action.payload;
      state.isLoading = true;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    setCount: (state, action) => {
      state.count = action.payload;
    },

    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
      // console.log('state.searchValue', state.searchValue);
    },
  },
});

export const { fetchData, setPage, setCount, setSearchValue } = dataSlice.actions;

export default dataSlice.reducer;
