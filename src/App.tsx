import { Component } from 'react';
import './App.scss';
import axios from 'axios';
import { AppProps, AppState } from './types/common-types';
import CharacterList from './Components/CharacterList/CharacterList';
import Searching from './Components/Searching/Searching';
import { Rickandmorty } from './types/rickandmorty-types';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import TestErrorButton from './Components/TestErrorButton/TestErrorButton';
import { BASE_URL } from './constants';

class App extends Component<AppProps, AppState> {
  constructor(props: object) {
    super(props);

    this.state = {
      data: [],
      isLoading: false,
      url: '',
      nextUrl: '',
      prevUrl: '',
    };
  }

  private async fetchData() {
    let url = '';
    const value = localStorage.getItem('searchValue');
    this.setState({ isLoading: true });

    value && value.length > 0
      ? (url = `${BASE_URL}/character/?name=${value}`)
      : (url = `${BASE_URL}/character`);

    const response = await axios.get(url);
    this.setState({ nextUrl: response.data.next });
    this.setState({ prevUrl: response.data.previous });
    this.setState({ isLoading: false });
    return response.data.results;
  }

  componentDidMount(): void {
    this.fetchData().then((data) => {
      this.setState({ data });
    });
  }

  searchData = (searchingData: Rickandmorty[]) => {
    this.setState({ data: searchingData });
  };

  render() {
    return (
      <>
        <div className="container">
          <ErrorBoundary>
            <TestErrorButton />
            <ErrorBoundary>
              <Searching data={this.state.data} searchData={this.searchData} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharacterList data={this.state.data} isLoading={this.state.isLoading} />
            </ErrorBoundary>
          </ErrorBoundary>
        </div>
      </>
    );
  }
}

export default App;
