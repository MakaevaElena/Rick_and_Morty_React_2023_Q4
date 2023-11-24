import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_COUNT, DEFAULT_PAGE } from '../../constants';
import { DataState } from './types';

const initialState: DataState = {
  init: true,
  data: [],
  // details: {
  //   id: 0,
  //   name: '',
  //   status: '',
  //   species: '',
  //   type: '',
  //   gender: '',
  //   origin: {
  //     name: '',
  //     url: '',
  //   },
  //   location: {
  //     name: '',
  //     url: '',
  //   },
  //   image: '',
  //   episode: [],
  //   url: '',
  //   created: '',
  // },
  mainIsLoading: false,
  detailesIsLoading: false,
  page: DEFAULT_PAGE,
  countPerPage: DEFAULT_COUNT,
  searchValue: '',
  viewMode: false,
  query: {
    type: 'searchValue',
    value: '',
  },
};

const dataSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInit: (state, action) => {
      state.init = action.payload;
    },
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
    // setDetails: (state, action) => {
    //   state.details = action.payload;
    // },

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
  setInit,
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
