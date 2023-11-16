import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_COUNT, DEFAULT_PAGE } from '../../constants';
import { DataState } from './types';

const initialState: DataState = {
  data: [],
  cardIsLoading: false,
  mainIsLoading: false,
  detailesIsLoading: false,
  page: DEFAULT_PAGE,
  countPerPage: DEFAULT_COUNT,
  searchValue: '',
  viewMode: false,
};

const dataSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMainIsLoading: (state, action) => {
      state.mainIsLoading = action.payload;
      // console.log(state.mainIsLoading);
    },
    setDetailesIsLoading: (state, action) => {
      state.detailesIsLoading = action.payload;
      // console.log(state.detailesIsLoading);
    },
    setCardIsLoading: (state, action) => {
      state.cardIsLoading = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
      // console.log(state.viewMode);
    },
    setData: (state, action) => {
      state.data = action.payload;
      state.cardIsLoading = true;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    setCount: (state, action) => {
      state.countPerPage = action.payload;
    },

    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
      // console.log('state.searchValue', state.searchValue);
    },
  },
});

export const {
  setMainIsLoading,
  setDetailesIsLoading,
  setCardIsLoading,
  setViewMode,
  setData,
  setPage,
  setCount,
  setSearchValue,
} = dataSlice.actions;

export default dataSlice.reducer;
