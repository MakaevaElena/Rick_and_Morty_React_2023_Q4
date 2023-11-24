import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import Layout from '../Layout/Layout';
import Pagination from '../Pagination/Pagination';

describe('Tests for ButtonList component', () => {
  it('Render Button component', () => {
    render(
      <Provider store={store}>
        <Layout>
          <Pagination />
        </Layout>
      </Provider>
    );

    waitFor(() => {
      const ButtonList = screen.getByTestId('button-list');
      expect(ButtonList).toBeInTheDocument();
    });
  });
});
