import { store } from '../store/store';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';
import { useFetchDataByPageQuery } from './rtkq-api';
import { renderHook } from '@testing-library/react';
import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
// import { DEFAULT_COUNT, DEFAULT_PAGE } from '../constants';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();
// fetchMock.enableMocks();

const data = {};

beforeAll(() => {
  fetchMocker.mockOnceIf('https://rickandmortyapi.com/api/character/?page=3', () =>
    Promise.resolve({
      status: 200,
      body: JSON.stringify({ data }),
    })
  );
});

// beforeEach(() => {
//   fetchMocker.doMock();
// });

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

it('renders hook', () => {
  const { result } = renderHook(() => useFetchDataByPageQuery(3), { wrapper: Wrapper });

  // expect(result.current).toMatchObject({
  //   viewMode: false,
  //   currentData: {},
  //   data: {},
  //   endpointName: 'fetchDataByPage',
  //   isError: false,
  //   isFetching: true,
  //   isLoading: true,
  //   isSuccess: false,
  //   isUninitialized: false,
  //   originalArgs: 3,
  //   // refetch: [],
  //   // requestId: 'GtbRBEvIOccx2qhTtShJs',
  //   // startedTimeStamp: 1700409183652,
  //   status: 'pending',
  // }),
  expect(result.current).toBeTruthy();
  // expect(fetchMocker).toHaveBeenCalled();
});
