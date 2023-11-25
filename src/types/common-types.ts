import { IRickandmortyAPI, Rickandmorty } from '@/types/rickandmorty-types';
import { ReactNode } from 'react';

export type SearchPageProps = {
  searchedList: IRickandmortyAPI;
  children?: ReactNode;
};

export type DetailsProps = {
  searchedList: IRickandmortyAPI;
  details: Rickandmorty;
};

export type InfoProps = {
  details: Rickandmorty;
};

export interface AppProps {
  data: IRickandmortyAPI;
  children?: ReactNode;
}

export interface IContext {
  data: Rickandmorty[];
  setData: (c: Rickandmorty[]) => void;
}
