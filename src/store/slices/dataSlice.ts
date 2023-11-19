import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_COUNT, DEFAULT_PAGE } from '../../constants';
import { DataState } from './types';

const initialState: DataState = {
  data: [],
  mainIsLoading: false,
  detailesIsLoading: false,
  page: DEFAULT_PAGE,
  countPerPage: DEFAULT_COUNT,
  searchValue: '',
  viewMode: false,
  query: {
    type: '',
    value: '',
  },
};

const dataSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setMainIsLoading: (state, action) => {
      state.mainIsLoading = action.payload;
    },
    setDetailesIsLoading: (state, action) => {
      state.detailesIsLoading = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    setCountPerPage: (state, action) => {
      state.countPerPage = action.payload;
    },

    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setMainIsLoading,
  setDetailesIsLoading,
  setViewMode,
  setData,
  setPage,
  setCountPerPage,
  setSearchValue,
  setQuery,
} = dataSlice.actions;

export default dataSlice.reducer;
