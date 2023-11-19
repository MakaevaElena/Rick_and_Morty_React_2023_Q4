import '@testing-library/jest-dom';

import { unmountComponentAtNode } from 'react-dom';

let container: Element | null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
});
