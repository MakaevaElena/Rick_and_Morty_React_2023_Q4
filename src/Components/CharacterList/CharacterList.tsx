import React from 'react';
import './style.scss';
import Card from '../Card/Card';
import { Rickandmorty } from '../../types/rickandmorty-types';
import Loader from '../Loader/Loader';

interface Props {
  data: Rickandmorty[];
  isLoading: boolean;
}

const CharacterList: React.FC<Props> = (props) => {
  return props.isLoading ? (
    <Loader />
  ) : (
    <>
      <h2>Character List {props.data.length}</h2>
      <section className="character-list">
        {props.data.length > 0 ? (
          props.data.map((character) => <Card key={character.id} RickandmortyData={character} />)
        ) : (
          <h2>Character not found</h2>
        )}
      </section>
    </>
  );
};

export default CharacterList;
