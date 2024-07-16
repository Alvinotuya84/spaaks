import React from 'react';
import {Provider} from 'react-redux';
import {render} from '@testing-library/react-native';
import {configureStore, Store} from '@reduxjs/toolkit';
import {describe, beforeEach, expect, it} from '@jest/globals';
import cartReducer, {
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from '@/src/app/features/theme/cartSlice';
import CartScreen from '@/src/screens/Tabs/CartScreen';

describe('CartScreen', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({reducer: {cart: cartReducer}});
  });

  it('renders without crashing', () => {
    const {getByText, getAllByText} = render(
      <Provider store={store}>
        <CartScreen />
      </Provider>,
    );

    expect(getByText('My Cart')).toBeTruthy();
  });
  beforeEach(() => {
    store = configureStore({reducer: {cart: cartReducer}});
  });

  it('displays "Empty Cart" when there are no items', () => {
    const {getByText} = render(
      <Provider store={store}>
        <CartScreen />
      </Provider>,
    );

    expect(getByText('Empty Cart')).toHaveLength(1);
  });
});
