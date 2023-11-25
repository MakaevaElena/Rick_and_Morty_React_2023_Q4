import { DetailsProps } from '../../types/common-types';
import React from 'react';
import CharacterList from '../../Components/Character-list/Character-list';
import Info from '@/Components/Info/Info';
import {
  // fetchDataByPage,
  fetchDataByValue,
  fetchRickandmortyDetails,
  getRunningQueriesThunk,
} from '@/api/rtkq-api';
import { wrapper } from '@/store/store';

const Details: React.FC<DetailsProps> = ({ searchedList, details }) => {
  return (
    <>
      <CharacterList characterList={searchedList}>
        <Info details={details} />
      </CharacterList>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const serchValue = context.query.searchValue;
  const id = context.query.id || '1';
  // const page = context.query.page || '1';
  const { data: details } = await store.dispatch(fetchRickandmortyDetails.initiate(+id));

  // const { data: characterList } = await store.dispatch(fetchDataByPage.initiate(+page));

  const { data: searchedList } = await store.dispatch(
    fetchDataByValue.initiate({
      type: 'searchValue',
      value: serchValue && typeof serchValue === 'string' ? serchValue : '',
    })
  );

  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  // console.log('State on server', store.getState());

  return {
    props: { searchedList, details },
  };
});

export default Details;
