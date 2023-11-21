import { AppProps } from '../types';
import React from 'react';
import CharacterList from '../../Components/Character-list/Character-list';
import Info from '@/Components/Info/Info';

const Details: React.FC<AppProps> = () => {
  return (
    <>
      <CharacterList children={<Info />} />
    </>
  );
};

export default Details;
