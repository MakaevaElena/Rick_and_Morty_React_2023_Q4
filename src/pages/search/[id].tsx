import { fetchRickandmortyDetails, getRunningQueriesThunk } from '@/api/rtkq-api';
// import { wrapper } from '../../../lib/store';
import Character from './details';
import { store } from '@/store/store';
// import { wrapper } from '@/store/store';

export default Character;

// export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
export const getServerSideProps = async (context: { query: { id: string } }) => {
  const id = context.query.id;
  if (typeof id === 'string') {
    store.dispatch(fetchRickandmortyDetails.initiate(+id));
  }

  // const data = await Promise.all(store.dispatch(getRunningQueriesThunk()));
  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  return {
    props: {},
    // props: { data },
  };
  // });
};
