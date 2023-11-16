import { Rickandmorty } from '../../types/rickandmorty-types';

export type DataState = {
  data: Rickandmorty[];
  cardIsLoading: boolean;
  mainIsLoading: boolean;
  detailesIsLoading: boolean;
  page: number;
  countPerPage: string;
  searchValue: string;
  viewMode: boolean;
};
