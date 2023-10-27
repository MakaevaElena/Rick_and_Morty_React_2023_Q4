import axios from 'axios';
import React from 'react';
import { Rickandmorty } from '../../types/rickandmorty-types';
import './style.scss';
import Loader from '../Loader/Loader';

const baseUrl = 'https://rickandmortyapi.com/api/';

interface Props {
  RickandmortyData: Rickandmorty;
}

interface State {
  details: Rickandmorty;
  isLoading: boolean;
}

export default class Card extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      details: {
        id: 1,
        name: '',
        status: '',
        species: '',
        type: '',
        gender: '',
        origin: {
          name: '',
          url: '',
        },
        location: {
          name: '',
          url: '',
        },
        image: '',
        episode: ['', ''],
        url: '',
        created: '',
      },
      isLoading: false,
    };
  }

  private async fetchRickandmortyDetails() {
    this.setState({ isLoading: true });
    const response = await axios.get(`${baseUrl}/character/${this.props.RickandmortyData.id}`);
    this.setState({ isLoading: false });
    return response.data;
  }

  componentDidMount(): void {
    this.fetchRickandmortyDetails().then((details) => this.setState({ details }));
  }

  render() {
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <>
        <div className="card">
          <h3>{this.props.RickandmortyData.name}</h3>
          <img
            className="character-img"
            src={this.state.details.image ? this.state.details.image : ''}
            alt=""
          />
          <div className="stats">
            <li> species: {this.state.details.species}</li>
            <li> gender: {this.state.details.gender}</li>
            <li> location: {this.state.details.location.name}</li>
          </div>
        </div>
      </>
    );
  }
}
