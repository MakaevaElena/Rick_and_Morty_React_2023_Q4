import { Rickandmorty } from '../../types/rickandmorty-types';

export type DataState = {
  init: boolean;
  data: Rickandmorty[];
  // details: Rickandmorty,
  mainIsLoading: boolean;
  detailesIsLoading: boolean;
  page: number;
  countPerPage: string;
  searchValue: string;
  viewMode: boolean;
  query: {
    type: string;
    value: string;
  };
};
