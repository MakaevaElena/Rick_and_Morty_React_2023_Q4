import '@testing-library/jest-dom';
// import { unmountComponentAtNode } from 'react-dom';
import { createRoot } from 'react-dom/client';

let container: Element | null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  if (container) {
    // unmountComponentAtNode(container);

    const root = createRoot(container);

    root.unmount();
    container.remove();
    container = null;
  }
});
