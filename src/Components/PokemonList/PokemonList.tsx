import React from 'react';
import './style.scss';
import Card from '../Card/Card';
import { Rickandmorty } from '../../types/rickandmorty-types';

interface Props {
  data: Rickandmorty[];
  isLoading: boolean;
}

export default class PokemonList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <h2>Character List {this.props.data.length}</h2>
        <section className="pokemon-list">
          {this.props.data.length > 0 ? (
            this.props.data.map((data) => (
              <Card key={data.id} RickandmortyData={data} isLoading={this.props.isLoading} />
            ))
          ) : (
            <h2>Pokemon not found</h2>
          )}
        </section>
      </>
    );
  }
}

// https://www.coderdoc.ru/start/35_typescript/14_component/14_1_class.php
