import { ReactNode } from 'react';
import { Rickandmorty } from '../../types/rickandmorty-types';

export interface AppProps {
  children?: ReactNode;
}

export interface IContext {
  page: number;
  setPage: (c: number) => void;
  setCount: (c: string) => void;
  searchValue: string;
  setSearchValue: (c: string) => void;
  data: Rickandmorty[];
  setData: (c: Rickandmorty[]) => void;
  isLoading: boolean;
}
