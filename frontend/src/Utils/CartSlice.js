// Utils/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array to store items in the cart
  restaurantName: '', // Store the restaurant name
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
        const { menuItem, restaurantName } = action.payload; // Destructure payload
        const existingItem = state.items.find(item => item.name === menuItem.name);
        if (existingItem) {
          // If item already exists in cart, increase its quantity
          existingItem.quantity++;
        } else {
          // Otherwise, add the new item to the cart
          state.items.push({ ...menuItem, quantity: 1 });
        }
        state.restaurantName = restaurantName; // Store the restaurant name
      },
    removeFromCart(state, action) {
      const itemId = action.payload;
      state.items = state.items.filter(item => item._id !== itemId);
    },
    increaseQuantity(state, action) {
      const itemId = action.payload;
      const item = state.items.find(item => item._id === itemId);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity(state, action) {
      const itemId = action.payload;
      const item = state.items.find(item => item._id === itemId);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export const selectCartItems = state => state.cart.items;
export const selectRestaurantName = state => state.cart.restaurantName; // Selector for restaurant name

export default cartSlice.reducer;
