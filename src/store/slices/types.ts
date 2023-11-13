import { Rickandmorty } from '../../types/rickandmorty-types';

export type DataState = {
  data: Rickandmorty[];
  isLoading: boolean;
  page: number;
  countPerPage: string;
  searchValue: string;
};
