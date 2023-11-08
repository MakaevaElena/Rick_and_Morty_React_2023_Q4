import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { render, screen } from '@testing-library/react';

describe('Tests for App component', () => {
  // test.todo('Hello from Jest');
  it('Renders not found if invalid path', () => {
    render(
      <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
        {/* <WrappedApp /> */}
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
