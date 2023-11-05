import { ReactNode } from 'react';

export interface AppProps {
  children?: ReactNode;
}

export interface IContext {
  page: number;
  setPage: (c: number) => void;
  setCount: (c: string) => void;
}
