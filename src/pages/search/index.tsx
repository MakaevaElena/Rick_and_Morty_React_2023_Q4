import { SearchPageProps } from '../../types/common-types';
import React from 'react';
import CharacterList from '../../Components/Character-list/Character-list';
import { fetchDataByPage, getRunningQueriesThunk } from '@/api/rtkq-api';
import { wrapper } from '@/store/store';
// import { useAppSelector } from '@/store/slices/hooks';

const Search: React.FC<SearchPageProps> = ({ searchedList }) => {
  return (
    <>
      <CharacterList characterList={searchedList} />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // const id = context.query.id || '1';
  const page = context.query.page || '1';

  // const { data: details } = await store.dispatch(fetchRickandmortyDetails.initiate(+id));
  const { data: searchedList } = await store.dispatch(fetchDataByPage.initiate(+page));

  // const query = useAppSelector((state) => state.data.query);
  // const state = store.getState();
  // const { data: searchedList } = await store.dispatch(fetchDataByValue.initiate(state.data.query));

  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  console.log('State on server', store.getState());

  return {
    // props: {},
    props: { searchedList },
  };
  // });
});

export default Search;
