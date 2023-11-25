import { SearchPageProps } from '../../types/common-types';
import React from 'react';
import CharacterList from '../../Components/Character-list/Character-list';
import { fetchDataByPage, fetchDataByValue, getRunningQueriesThunk } from '@/api/rtkq-api';
import { wrapper } from '@/store/store';

const Search: React.FC<SearchPageProps> = ({ searchedList }) => {
  return (
    <>
      <CharacterList characterList={searchedList} />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const serchValue = context.query.searchValue;
  const page = context.query.page || '1';
  // const { data } = await store.dispatch(fetchDataByPage.initiate(+page));
  const { data: searchedList } = serchValue
    ? await store.dispatch(
        fetchDataByValue.initiate({
          type: 'searchValue',
          value: serchValue && typeof serchValue === 'string' ? serchValue : '',
        })
      )
    : await store.dispatch(fetchDataByPage.initiate(+page));

  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  // console.log('State on server', store.getState());

  return {
    props: { searchedList },
  };
});

export default Search;
