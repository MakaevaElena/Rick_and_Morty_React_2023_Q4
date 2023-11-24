import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';
import { TestComponent } from '../../mocks/mocks-component';
// import { useFetchDataByValueQuery } from '@/api/rtkq-api';

describe('Tests for the Card List component', () => {
  test('Verify that the component not renders the tytle', () => {
    render(<TestComponent />);
    const element = screen.queryByText(/Character List/i);
    expect(element).not.toBeInTheDocument();
  });

  test('Verify that the component renders the specified number of cards', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(2);
    });
  });

  // it('displayes "Character not found" if no cards are present', () => {
  //   const useFetchData = () =>
  //     useFetchDataByValueQuery({
  //       type: 'searchValue',
  //       value: 'string',
  //     });

  //   (useFetchData as Mock).mockImplementation(() => {
  //     return {
  //       data: [],
  //     };
  //   });
  //   render(<TestComponent />);
  //   const emtyList = screen.getByTestId('character-list');
  //   expect(emtyList).toHaveTextContent('Character not found');
  // });
});
