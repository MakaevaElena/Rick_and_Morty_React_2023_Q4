import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorButton from './ErrorButton';

// vi.mock('next/router', () => require('next-router-mock'));

describe('Tests for Button component', () => {
  it('Render ErrorButton component', () => {
    render(<ErrorButton />);
    const ButtonElement = screen.getByText('TestErrorButton');
    expect(ButtonElement).toBeInTheDocument();
  });
});
