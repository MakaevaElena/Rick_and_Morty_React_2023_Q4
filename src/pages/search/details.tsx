import { DetailsProps } from '../../types/common-types';
import React from 'react';
import CharacterList from '../../Components/Character-list/Character-list';
import Info from '@/Components/Info/Info';
import { fetchDataByPage, fetchRickandmortyDetails, getRunningQueriesThunk } from '@/api/rtkq-api';
import { wrapper } from '@/store/store';

const Details: React.FC<DetailsProps> = ({ characterList, details }) => {
  return (
    <>
      {/* <CharacterList children={<Info />} /> */}
      <CharacterList characterList={characterList}>
        <Info details={details} />
      </CharacterList>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const id = context.query.id || '1';
  const page = context.query.page || '1';
  const { data: details } = await store.dispatch(fetchRickandmortyDetails.initiate(+id));
  const { data: characterList } = await store.dispatch(fetchDataByPage.initiate(+page));
  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  // console.log('State on server', store.getState());

  return {
    // props: {},
    props: { characterList, details },
  };
  // });
});

export default Details;
