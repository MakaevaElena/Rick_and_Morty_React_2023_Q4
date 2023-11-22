import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
import { IRickandmortyAPI, Rickandmorty } from '../types/rickandmorty-types';
import { HYDRATE } from 'next-redux-wrapper';

export const rtkqApi = createApi({
  reducerPath: 'rickAndMorty',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    fetchDataByPage: builder.query<IRickandmortyAPI, number>({
      query: (page) => `/character/?page=${page}`,
    }),

    fetchDataByValue: builder.query<IRickandmortyAPI, { type: string; value: string }>({
      query: (query) => {
        const searchValue = localStorage.getItem('searchValue');
        if (query.type === 'searchValue') {
          return `/character/?name=${query.value}`;
        } else if (query.type === 'changePage') {
          return `/character/?page=${query.value}`;
        }
        if (searchValue) {
          return `/character/?name=${searchValue}`;
        } else return `/character/`;
      },
    }),

    fetchRickandmortyDetails: builder.query<Rickandmorty, number>({
      query: (id) => `/character/${id}`,
    }),
  }),
});

export const {
  useFetchDataByPageQuery,
  useFetchDataByValueQuery,
  useFetchRickandmortyDetailsQuery,
} = rtkqApi;
