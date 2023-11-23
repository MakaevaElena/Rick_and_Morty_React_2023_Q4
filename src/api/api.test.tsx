import React from 'react';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';
import { useFetchDataByPageQuery } from './rtkq-api';
import { renderHook } from '@testing-library/react';
import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const data = {};

beforeAll(() => {
  fetchMocker.mockOnceIf('https://rickandmortyapi.com/api/character/?page=3', () =>
    Promise.resolve({
      status: 200,
      body: JSON.stringify({ data }),
    })
  );
});

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

it('renders hook', () => {
  const { result } = renderHook(() => useFetchDataByPageQuery(3), { wrapper: Wrapper });

  expect(result.current).toBeTruthy();
});
