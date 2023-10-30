import React from 'react';
import './style.scss';
import Card from '../Card/Card';
import { CharacterListProps } from '../../types/common-types';
import Loader from '../Loader/Loader';

export default class CharacterList extends React.Component<CharacterListProps> {
  constructor(props: CharacterListProps) {
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
