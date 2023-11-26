import { fetchRickandmortyDetails, getRunningQueriesThunk } from '@/api/rtkq-api';
import { wrapper } from '@/store/store';
import Info from '@/Components/Info/Info';

export default Info;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const id = context.query.id || '1';
  const { data } = await store.dispatch(fetchRickandmortyDetails.initiate(+id));
  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: { data },
  };
});
