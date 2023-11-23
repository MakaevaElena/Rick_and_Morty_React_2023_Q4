import { AppProps } from '../../types/common-types';
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
