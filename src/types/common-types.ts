import { ReactNode } from 'react';
import { Rickandmorty } from './rickandmorty-types';

export interface CardProps {
  RickandmortyData: Rickandmorty;
}

export interface IContext {
  page: number;
  setPage: (c: number) => void;
  setCount: (c: string) => void;
}

export interface MainProps {
  data: Rickandmorty[];
  isLoading: boolean;
}

export interface PaginationProps {
  data: Rickandmorty[];
  isLoading: boolean;
}

export interface CardProps {
  RickandmortyData: Rickandmorty;
}

export interface CardState {
  details: Rickandmorty;
  isLoading: boolean;
}

export interface AppProps {
  children?: ReactNode;
}

export interface AppState {
  data: Rickandmorty[];
  isLoading: boolean;
  url: string;
  nextUrl: string;
  prevUrl: string;
}

export interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface SearchingProps {
  getSearchData: (data: Rickandmorty[]) => void;
}

export interface SearchingState {
  value: string;
}

export interface TestErrorButtonState {
  hasError: boolean;
}

export interface TestErrorButtonProps {
  children?: ReactNode;
}
