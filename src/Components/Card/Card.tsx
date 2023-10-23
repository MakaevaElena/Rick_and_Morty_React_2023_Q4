import axios from 'axios';
import React from 'react';
import { Pokemon } from '../../types/pokemon-types';
import './style.scss';

const url = 'https://pokeapi.co/api/v2/pokemon/';

interface Props {
  PokemonData: Pokemon;
  isLoading: boolean;
}

// type PokemonData = {
//   name: string;
//   url: string;
//   stats: Stat[];
//   details: Details;
// };

// type Details = {
//   sprites: {
//     front_default: string;
//   };
// };

interface State {
  details: Pokemon;
}

export default class Card extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      details: {
        sprites: {
          front_default: '',
          front_shiny: '',
          front_female: '',
          front_shiny_female: '',
          back_default: '',
          back_shiny: '',
          back_female: '',
          back_shiny_female: '',
        },
        id: 0,
        name: '',
        base_experience: 0,
        height: 0,
        is_default: false,
        order: 0,
        weight: 0,
        abilities: [],
        held_items: [],
        location_area_encounters: '',
        moves: [],
        stats: [],
        types: [],
        past_types: [],
      },
    };
  }

  private async fetchPokemonDetails() {
    // const response = await axios.get(this.props.PokemonData.url);
    const response = await axios.get(`${url}${this.props.PokemonData.name}`);
    return response.data;
  }

  componentDidMount(): void {
    this.fetchPokemonDetails().then((details) => this.setState({ details }));
  }

  render() {
    return (
      <>
        <div className="card">
          <h3>{this.props.PokemonData.name}</h3>
          {/* <img className="pokemon-img" src={this.state.details.sprites.front_default} alt="" /> */}
          <img
            className="pokemon-img"
            src={
              this.state.details.sprites.front_default
                ? this.state.details.sprites.front_default
                : ''
            }
            alt=""
          />
          <div className="stats"></div>
          {/* <button onClick={this.handleClick}>count is {this.state.count}</button> */}
        </div>
      </>
    );
  }
}
