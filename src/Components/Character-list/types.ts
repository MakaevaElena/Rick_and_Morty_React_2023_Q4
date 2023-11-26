import { IRickandmortyAPI } from '@/types/rickandmorty-types';
import { ReactNode } from 'react';

export type CharacterListProps = {
  characterList: IRickandmortyAPI;
  children?: ReactNode;
};
