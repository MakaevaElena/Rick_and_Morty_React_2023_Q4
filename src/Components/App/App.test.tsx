import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { render, screen } from '@testing-library/react';

describe('Tests for App component', () => {
  it('Renders not found if invalid path', () => {
    render(
      <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Page Not Found');
  });
});
