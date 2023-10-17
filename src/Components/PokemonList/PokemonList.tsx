import React from 'react';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';

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
        <section className="pokemonList">
          <h2>pokemonList</h2>
          {/* {this.props.data.map((data) => (
            <p key={data.name}>{data.name}</p>
          ))} */}
          {this.props.data.map((data) => (
            <Card key={data.name} PokemonData={data} isLoading={this.props.isLoading} />
          ))}

          <Pagination />
        </section>
      </>
    );
  }
}

// https://www.coderdoc.ru/start/35_typescript/14_component/14_1_class.php
