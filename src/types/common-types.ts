import { Rickandmorty } from '@/types/rickandmorty-types';
import { ReactNode } from 'react';

export interface AppProps {
  children?: ReactNode;
}

export interface IContext {
  data: Rickandmorty[];
  setData: (c: Rickandmorty[]) => void;
}
