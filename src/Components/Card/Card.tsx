import axios from 'axios';
import React from 'react';
import './style.css';

interface Props {
  PokemonData: PokemonData;
  isLoading: boolean;
}

type PokemonData = {
  name: string;
  url: string;
};

type Details = {
  sprites: {
    front_default: string;
  };
};

interface State {
  details: Details;
}

export default class Card extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      details: {
        sprites: {
          front_default: '',
        },
      },
    };
  }

  private async fetchPokemonDetails() {
    const response = await axios.get(this.props.PokemonData.url);
    console.log(response.data);
    return response.data;
  }

  componentDidMount(): void {
    this.fetchPokemonDetails().then((details) => this.setState({ details }));
  }

  render() {
    return (
      <>
        <div className="card">
          <h3>name: {this.props.PokemonData.name}</h3>
          <img className="pokemon-img" src={this.state.details.sprites.front_default} alt="" />
          {/* <button onClick={this.handleClick}>count is {this.state.count}</button> */}
        </div>
      </>
    );
  }
}
