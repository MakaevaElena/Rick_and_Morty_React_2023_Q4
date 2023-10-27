import React from 'react';
import './style.scss';
import Card from '../Card/Card';
import { Rickandmorty } from '../../types/rickandmorty-types';
import Loader from '../Loader/Loader';

interface Props {
  data: Rickandmorty[];
  isLoading: boolean;
}

export default class CharacterList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.props.isLoading ? (
      <Loader />
    ) : (
      <>
        <h2>Character List {this.props.data.length}</h2>
        <section className="character-list">
          {this.props.data.length > 0 ? (
            this.props.data.map((character) => (
              <Card key={character.id} RickandmortyData={character} />
            ))
          ) : (
            <h2>Character not found</h2>
          )}
        </section>
      </>
    );
  }
}
