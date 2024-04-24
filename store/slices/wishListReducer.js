import { createSlice } from "@reduxjs/toolkit";

const findItemIndex = (state, action) => state.findIndex(wishListItem => wishListItem.productId === action.payload.productId);

const slice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addWishListItem: (state, action) => {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex === -1) {
        state.push(action.payload)
      }
      return state;
    },
    removeWishListItem: (state, action) => {
      const existingItemIndex = findItemIndex(state, action);
      state.splice(existingItemIndex, 1)
    },
  }
})

export const {
  addWishListItem,
  removeWishListItem,
} = slice.actions;
export default slice.reducer;