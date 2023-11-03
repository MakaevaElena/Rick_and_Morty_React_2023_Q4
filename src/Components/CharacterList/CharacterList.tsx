import React from 'react';
import { Outlet } from 'react-router-dom';
import './style.scss';
import Card from '../Card/Card';
// import { Rickandmorty } from '../../types/rickandmorty-types';
import Loader from '../Loader/Loader';
import { CharacterListProps } from '../../types/common-types';
import Pagination from '../Pagination/Pagination';

const CharacterList: React.FC<CharacterListProps> = (props) => {

  return props.isLoading ? (
    <Loader />
  ) : (
    <>
      <h2>Character List {props.data.length}</h2>
      <div className="character-list-container">
        <section className="character-list">
          {props.data.length > 0 ? (
            props.data.map((character) => <Card key={character.id} RickandmortyData={character} />)
          ) : (
            <h2>Character not found</h2>
          )}
        </section>
        <Outlet />
      </div>

      <Pagination />
    </>
  );
};

export default CharacterList;
