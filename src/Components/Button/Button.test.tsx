import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

const mockHandleClick = vi.fn();
const mockChildren = 'TestButtonText';

describe('Tests for Button component', () => {
  it('Render Button component', () => {
    render(<Button onClick={mockHandleClick}>{mockChildren}</Button>);
    const ButtonElement = screen.getByRole('button');
    expect(ButtonElement).toBeInTheDocument();
  });

  it('Button component is clicked', () => {
    render(<Button onClick={mockHandleClick}>{mockChildren}</Button>);
    const ButtonElement = screen.getByRole('button');
    fireEvent.click(ButtonElement);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  it('Button text is correct', () => {
    render(<Button onClick={mockHandleClick}>{mockChildren}</Button>);
    const ButtonElement = screen.getByRole('button');
    expect(ButtonElement.textContent).toBe(mockChildren);
  });
});
