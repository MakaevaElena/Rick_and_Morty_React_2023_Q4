import { Rickandmorty } from '../../types/rickandmorty-types';

export interface MainProps {
  data: Rickandmorty[];
  isLoading: boolean;
}
