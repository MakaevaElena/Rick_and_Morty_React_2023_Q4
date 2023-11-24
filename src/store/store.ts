import { ThunkAction, configureStore } from '@reduxjs/toolkit';
import { Action } from 'redux';
import dataReducer from './slices/dataSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rtkqApi } from '../api/rtkq-api';
import { createWrapper } from 'next-redux-wrapper';

// export const store = configureStore({
//   reducer: {
//     data: dataReducer,
//     [rtkqApi.reducerPath]: rtkqApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkqApi.middleware),
// });

// setupListeners(store.dispatch);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export type AppStore = ReturnType<typeof configureStore>;
////
// export const makeStore = () =>
//   configureStore({
//     reducer: {
//       data: dataReducer,
//       [rtkqApi.reducerPath]: rtkqApi.reducer,
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkqApi.middleware),
//   });

// const store = makeStore();

// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];

// export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
////
// https://github.com/gfortaine/rtk-query-nextjs-example/blob/main/src/store.ts
const makeStore = () => {
  return configureStore({
    reducer: {
      data: dataReducer,
      [rtkqApi.reducerPath]: rtkqApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkqApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export const store = makeStore();
setupListeners(store.dispatch);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
