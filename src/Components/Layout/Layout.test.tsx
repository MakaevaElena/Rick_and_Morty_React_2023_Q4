import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Layout from './Layout';

describe('Tests for Layout component', () => {
  it('Renders headers', () => {
    render(
      <Provider store={store}>
        <Layout />
      </Provider>
    );
    expect(
      screen.getAllByRole('heading', {
        level: 4,
      })[0]
    ).toHaveTextContent(/SearchValue from Store:/);
  });
});
