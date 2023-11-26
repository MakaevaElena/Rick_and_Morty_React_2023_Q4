import { ThunkAction, configureStore } from '@reduxjs/toolkit';
import { Action } from 'redux';
import dataReducer from './slices/dataSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rtkqApi } from '../api/rtkq-api';
import { createWrapper } from 'next-redux-wrapper';

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
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
