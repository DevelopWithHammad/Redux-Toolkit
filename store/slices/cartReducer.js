
import { createSelector, createSlice } from "@reduxjs/toolkit";

const findItemIndex = (state, action) => state.findIndex(cartItem => cartItem.productId === action.payload.productId);

const slice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    list: [],
    error: ""
  },
  reducers: {
    fetchCartItems: (state, action) => {
      state.loading = false
      state.list = action.payload.products
    },
    handleCartError: (state, action) => {
      state.loading = false
      state.error = "Something went wrong"
    },
    handleCartLoading: (state) => {
      state.loading = true
    },
    addCartItem: (state, action) => {
      const existingIndex = findItemIndex(state.list, action);
      if (existingIndex !== -1) {
        state.list[existingIndex].quantity += 1
      }
      else {
        state.list.push({ ...action.payload, quantity: 1 })
      }
    },
    removeCartItem: (state, action) => {
      const existingIndex = findItemIndex(state.list, action);
      state.list.splice(existingIndex, 1)
    },
    increaseCartItemQuantity: (state, action) => {
      const existingIndex = findItemIndex(state.list, action);
      state.list[existingIndex].quantity += 1
    },
    decreaseCartItemQuantity: (state, action) => {
      const existingIndex = findItemIndex(state.list, action);
      state.list[existingIndex].quantity -= 1
      if (state.list[existingIndex].quantity === 0) {
        state.list.splice(existingIndex, 1);
      }
    },
  }
});

// Selectors
export const getCartItems = createSelector(state => state.products.list, state => state.cartItems.list, (products, cartItems) => {
  return cartItems.map(cartItem => {
    const product = products.find(product => product.id === cartItem.productId);
    return { ...product, quantity: cartItem.quantity };
  }).filter(item => item.title);
}
);
export const getCartLoading = (state) => state.cartItems.loading;
export const getCartError = (state) => state.cartItems.error;

export const {
  addCartItem,
  fetchCartItems,
  removeCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  handleCartError,
  handleCartLoading,
} = slice.actions

export default slice.reducer;