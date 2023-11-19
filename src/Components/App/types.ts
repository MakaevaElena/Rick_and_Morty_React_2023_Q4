import { ReactNode } from 'react';
import { Rickandmorty } from '../../types/rickandmorty-types';

export interface AppProps {
  children?: ReactNode;
}

export interface IContext {
  data: Rickandmorty[];
  setData: (c: Rickandmorty[]) => void;
}
