import { AppProps } from '../types';
import React from 'react';
import CharacterList from '../../Components/Character-list/Character-list';

const Search: React.FC<AppProps> = () => {
  return (
    <>
      <CharacterList />
    </>
  );
};

export default Search;
