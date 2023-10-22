import React from 'react';
import './style.scss';
import Card from '../Card/Card';

type PokemonData = {
  name: string;
  url: string;
};

interface Props {
  data: PokemonData[];
  isLoading: boolean;
}

export default class PokemonList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <h2>pokemonList</h2>
        <section className="pokemon-list">
          {/* {this.props.data.map((data) => (
            <p key={data.name}>{data.name}</p>
          ))} */}
          {this.props.data.map((data) => (
            <Card key={data.name} PokemonData={data} isLoading={this.props.isLoading} />
          ))}
        </section>
        
      </>
    );
  }
}

// https://www.coderdoc.ru/start/35_typescript/14_component/14_1_class.php
