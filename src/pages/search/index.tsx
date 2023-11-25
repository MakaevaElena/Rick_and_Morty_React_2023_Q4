import { SearchPageProps } from '../../types/common-types';
import React from 'react';
import CharacterList from '../../Components/Character-list/Character-list';
import { fetchDataByValue, getRunningQueriesThunk } from '@/api/rtkq-api';
import { wrapper } from '@/store/store';
// import { useAppSelector } from '@/store/slices/hooks';

const Search: React.FC<SearchPageProps> = ({ searchedList }) => {
  console.log(searchedList);
  return (
    <>
      <CharacterList characterList={searchedList} />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const serchValue = context.query.search;
  // const page = context.query.page || '1';

  // const { data: details } = await store.dispatch(fetchRickandmortyDetails.initiate(+id));
  // const { data: searchedList } =
  //   serchValue && typeof serchValue === 'string'
  //     ? await store.dispatch(
  //         fetchDataByValue.initiate({
  //           type: 'searchValue',
  //           value: serchValue,
  //         })
  //       )
  //     : await store.dispatch(fetchDataByPage.initiate(+page));

  // const { data: searchedList } = await store.dispatch(fetchDataByPage.initiate(+page));

  // const query = useAppSelector((state) => state.data.query);
  // const state = store.getState();
  // console.log('state.data.query', state.data.query);
  // const { data: searchedList } = await store.dispatch(fetchDataByValue.initiate(state.data.query));
  const { data: searchedList } = await store.dispatch(
    fetchDataByValue.initiate({
      type: 'searchValue',
      value: serchValue && typeof serchValue === 'string' ? serchValue : '',
    })
  );

  console.log(searchedList);

  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  // console.log('State on server', store.getState());

  return {
    // props: {},
    props: { searchedList },
  };
  // });
});

export default Search;
