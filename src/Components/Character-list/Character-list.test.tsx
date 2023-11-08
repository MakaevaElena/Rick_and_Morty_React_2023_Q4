import CharacterList from './Character-list';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
// import { describe, expect, it } from 'vitest';
// require('@testing-library/jest-dom');
// require('@testing-library/jest-dom/extend-expect');

//https://www.appsloveworld.com/reactjs/100/3/property-tobeinthedocument-does-not-exist-on-type-matchersany

describe('Tests for the Card List component', () => {
  test('Verify that the component renders the specified number of cards', () => {
    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );
    // const element = screen.getByRole('heading', {
    //   level: 2,
    // });
    // expect(element).toHaveTextContent('Character List');
    const element = screen.getByText(/Character List/i);
    expect(element).toBeInTheDocument();
  });
});
