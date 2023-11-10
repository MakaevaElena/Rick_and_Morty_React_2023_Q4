import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorButton from './ErrorButton';

// const mockHandleClick = vi.fn();

describe('Tests for Button component', () => {
  it('Render ErrorButton component', () => {
    render(<ErrorButton />);
    const ButtonElement = screen.getByText('TestErrorButton');
    expect(ButtonElement).toBeInTheDocument();
  });

  // it('ErrorButton component is clicked', () => {
  //   render(<ErrorButton />);
  //   const ButtonElement = screen.getByRole('button');
  //   fireEvent.click(ButtonElement);
  //   expect(mockHandleClick).toHaveBeenCalledTimes(1);
  // });
});
