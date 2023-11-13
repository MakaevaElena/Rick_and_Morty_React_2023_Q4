import { configureStore } from '@reduxjs/toolkit';

import dataReducer from './slices/dataSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

//https://www.coderdoc.ru/start/36_react-redux-ts/01_configurestore/1_16_store.php
//https://github.com/shopot/react-101/tree/chapter-22
