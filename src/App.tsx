import { Component, ReactNode } from 'react';
import './App.scss';
import axios from 'axios';
import CharacterList from './Components/CharacterList/CharacterList';
import Pagination from './Components/Pagination/Pagination';
import Searching from './Components/Searching/Searching';
import Info from './Components/Info/Info';
import { Rickandmorty } from './types/rickandmorty-types';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import TestErrorButton from './Components/TestErrorButton/TestErrorButton';

const baseUrl = 'https://rickandmortyapi.com/api';

interface Props {
  children?: ReactNode;
}

interface State {
  data: Rickandmorty[];
  isLoading: boolean;
  url: string;
  nextUrl: string;
  prevUrl: string;
}

class App extends Component<Props, State> {
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
      ? (url = `${baseUrl}/character/?name=${value}`)
      : (url = `${baseUrl}/character`);

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
          </ErrorBoundary>
          <ErrorBoundary>
            <Searching
              data={this.state.data}
              searchData={this.searchData}
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <CharacterList data={this.state.data} isLoading={this.state.isLoading} />
          </ErrorBoundary>
          <ErrorBoundary>
            <Info />
          </ErrorBoundary>
          <ErrorBoundary>
            <Pagination />
          </ErrorBoundary>
        </div>
      </>
    );
  }
}

export default App;
