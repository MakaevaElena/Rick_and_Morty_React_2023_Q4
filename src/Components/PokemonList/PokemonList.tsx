import React from 'react';
import './style.scss';
import Card from '../Card/Card';
import { Pokemon } from '../../types/pokemon-types';

interface Props {
  data: Pokemon[];
  isLoading: boolean;
  // inputValue: string;
}

export default class PokemonList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <h2>Pokemon List {this.props.data.length}</h2>
        <section className="pokemon-list">
          {this.props.data.length > 0 ? (
            // {
            this.props.data.map((data) => (
              <Card key={data.name} PokemonData={data} isLoading={this.props.isLoading} />
            ))
          ) : (
            <h2>Pokemon not found</h2>
          )}
          {/* } */}
        </section>
      </>
    );
  }
}

// https://www.coderdoc.ru/start/35_typescript/14_component/14_1_class.php
