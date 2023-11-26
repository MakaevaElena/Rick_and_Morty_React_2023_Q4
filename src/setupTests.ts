import '@testing-library/jest-dom';
import { createRoot } from 'react-dom/client';
import { vi } from 'vitest';

let container: Element | null;
beforeEach(() => {
  vi.mock('next/router', () => require('next-router-mock'));
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  if (container) {
    const root = createRoot(container);

    root.unmount();
    container.remove();
    container = null;
  }
});
