import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';

const mockHandleClick = vi.fn();

describe('Tests for Button component', () => {
  it('Render Button component', () => {
    const [hasError, setHasError] = useState<boolean>(false);
    
    render(<Button onClick={mockHandleClick}></Button>);
    const ButtonElement = screen.getByRole('button');
    expect(ButtonElement).toBeInTheDocument();
  });
});
