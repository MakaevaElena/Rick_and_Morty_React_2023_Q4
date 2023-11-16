import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
import { IRickandmortyAPI, Rickandmorty } from '../types/rickandmorty-types';

export const rtkqApi = createApi({
  reducerPath: 'rickAndMorty',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    // fetchAllData: builder.query<IRickandmortyAPI, void>({
    //   query: () => `/character`,
    // }),

    fetchDataByPage: builder.query<IRickandmortyAPI, number>({
      query: (page) => `/character/?page=${page}`,
    }),

    fetchDataByValue: builder.query<IRickandmortyAPI, { type: string; value: string }>({
      query: (query) => {
        if (query.type === 'searchValue') {
          return `/character/?name=${query.value}`;
        } else return `/character/`;
      },
    }),

    fetchRickandmortyDetails: builder.query<Rickandmorty, number>({
      query: (id) => `/character/${id}`,
    }),
  }),
});

export const {
  // useFetchAllDataQuery,
  useFetchDataByPageQuery,
  useFetchDataByValueQuery,
  useFetchRickandmortyDetailsQuery,
} = rtkqApi;

// fetchDataByValue: builder.query<IRickandmortyAPI, { type: string; value: string }>({
//   query: (value) => (value ? `/character/?name=${value}` : `/character/`),
// }),

// query: (query) => {
//   if (query.type === 'searchValue') {
//     return `/character/?name=${query.value}`;
//   } else return `/character/`;
// },
