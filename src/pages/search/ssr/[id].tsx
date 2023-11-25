import { fetchRickandmortyDetails, getRunningQueriesThunk } from '@/api/rtkq-api';
// import { wrapper } from '../../../lib/store';
// import { store } from '@/store/store';
// import { GetServerSideProps } from 'next';
import { wrapper } from '@/store/store';
import Info from '@/Components/Info/Info';

export default Info;

// // export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
// export const getServerSideProps = async (context: { query: { id: string } }) => {
//   const id = context.query.id;
//   if (typeof id === 'string') {
//     store.dispatch(fetchRickandmortyDetails.initiate(+id));
//   }

//   // const data = await Promise.all(store.dispatch(getRunningQueriesThunk()));
//   await Promise.all(store.dispatch(getRunningQueriesThunk()));
//   return {
//     props: {},
//     // props: { data },
//   };
//   // });
// };

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const id = context.query.id || '1';
  // const page = context.query.page || '1';

  const { data } = await store.dispatch(fetchRickandmortyDetails.initiate(+id));
  // const { data } = await store.dispatch(fetchDataByPage.initiate(+page));

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    // props: {},
    props: { data },
  };
  // });
});

// https://github.com/gfortaine/rtk-query-nextjs-example/blob/main/src/pages/index.js
