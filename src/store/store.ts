import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rtkqApi } from '../api/rtkq-api';
// import { createWrapper } from 'next-redux-wrapper';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    [rtkqApi.reducerPath]: rtkqApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkqApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

//https://www.coderdoc.ru/start/36_react-redux-ts/01_configurestore/1_16_store.php
//https://github.com/shopot/react-101/tree/chapter-22
//https://habr.com/ru/companies/domrf/articles/736336/

// const makeStore = () => store;

export type AppStore = ReturnType<typeof configureStore>;
// export const wrapper = createWrapper<AppStore>(store., { debug: true });
