import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import '@testing-library/jest-dom';

import Loader from './Loader';

it('Renders the Spinner component', () => {
  render(<Loader />);
  const spinnerContainer = screen.getByTestId('loader');
  expect(spinnerContainer).toBeInTheDocument();
});
