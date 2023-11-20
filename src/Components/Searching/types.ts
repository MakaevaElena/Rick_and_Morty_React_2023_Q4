import { Rickandmorty } from '../../types/rickandmorty-types';

export interface SearchingProps {
  getSearchData: (data: Rickandmorty[]) => void;
}
