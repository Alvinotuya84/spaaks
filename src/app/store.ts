// src/app/store.ts

import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import themeReducer from '../app/features/theme/themeSlice';
import cartReducer from './features/theme/cartSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
