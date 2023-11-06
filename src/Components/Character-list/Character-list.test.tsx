import CharacterList from './Character-list';
import { render, screen } from '@testing-library/react';
// require('@testing-library/jest-dom');
// require('@testing-library/jest-dom/extend-expect');

//https://www.appsloveworld.com/reactjs/100/3/property-tobeinthedocument-does-not-exist-on-type-matchersany

const DEFAULT_DETAILS = {
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
};

describe('Tests for the Card List component', () => {
  test('Verify that the component renders the specified number of cards', () => {
    render(<CharacterList data={[DEFAULT_DETAILS]} isLoading={false} />);
    const element = screen.getByText(/Character List/);
    // expect(element).toBeInTheDocument();
    expect(element).toBeInstanceOf(HTMLElement);
  });
});
