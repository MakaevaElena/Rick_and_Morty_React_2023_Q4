import '@testing-library/jest-dom';

import { unmountComponentAtNode } from 'react-dom';

let container: Element | null;
beforeEach(() => {
  // подготавливаем DOM-элемент, куда будем рендерить
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // подчищаем после завершения
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
});
