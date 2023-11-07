import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom';

import Loader from './Loader';
describe('Test for Loader component', () => {
  test('Render Loader component', () => {
    render(<Loader />);
    const loaderContainer = screen.getByTestId('loader');
    expect(loaderContainer).toBeInTheDocument();
  });
});
