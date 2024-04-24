import { createSlice } from "@reduxjs/toolkit";

const findItemIndex = (state, action) => state.findIndex(cartItem => cartItem.productId === action.payload.productId);

const slice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addCartItem: (state, action) => {
      const existingIndex = findItemIndex(state, action);
      if (existingIndex !== -1) {
        state[existingIndex].quantity += 1
      }
      else {
        state.push({ ...action.payload, quantity: 1 })
      }
    },
    removeCartItem: (state, action) => {
      const existingIndex = findItemIndex(state, action);
      state.splice(existingIndex, 1)
    },
    increaseCartItemQuantity: (state, action) => {
      const existingIndex = findItemIndex(state, action);
      state[existingIndex].quantity += 1
    },
    decreaseCartItemQuantity: (state, action) => {
      const existingIndex = findItemIndex(state, action);
      state[existingIndex].quantity -= 1
      if (state[existingIndex].quantity === 0) {
        state.splice(existingItemIndex, 1);
      }
    },
  }
});

export const {
  addCartItem,
  removeCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity
} = slice.actions

export default slice.reducer;