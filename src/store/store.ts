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
export type AppStore = ReturnType<typeof configureStore>;

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
