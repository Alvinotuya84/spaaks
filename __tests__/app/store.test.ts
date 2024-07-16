import {configureStore, Store} from '@reduxjs/toolkit';
import cartReducer, {
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from '@/src/app/features/theme/cartSlice';
import {describe, beforeEach, expect, it} from '@jest/globals';
import {CartItem, Product} from '@/src/types/product';

describe('cartSlice', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({reducer: {cart: cartReducer}});
  });

  it('should handle addItemToCart', () => {
    const product: Product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      description: 'Test Description',
      category: 'Test Category',
      image: 'Test Image',
      rating: {rate: 5, count: 10},
    };
    store.dispatch(addItemToCart(product));
    const expectedCartItem: CartItem = {
      ...product,
      quantity: 1,
      totalPrice: 100,
    };
    expect(store.getState().cart).toEqual({
      items: [expectedCartItem],
      totalQuantity: 1,
      totalAmount: 100,
    });
  });

  it('should handle removeItemFromCart', () => {
    const product: Product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      description: 'Test Description',
      category: 'Test Category',
      image: 'Test Image',
      rating: {rate: 5, count: 10},
    };
    store.dispatch(addItemToCart(product));
    store.dispatch(removeItemFromCart(1));
    expect(store.getState().cart).toEqual({
      items: [],
      totalQuantity: 0,
      totalAmount: 0,
    });
  });
});
