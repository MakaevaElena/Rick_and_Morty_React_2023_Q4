import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom';

// vi.mock('next/router', () => require('next-router-mock'));

import Loader from './Loader';
describe('Test for Loader component', () => {
  test('Render Loader component', () => {
    render(<Loader />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
