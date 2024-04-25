import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    error: '',
    list: [],
  },
  reducers: {
    fetchProducts(state) {
      state.loading = true
    },
    handleError(state, action) {
      state.loading = false
      state.error = action.payload
    },
    updateAllProducts(state, action) {
      state.loading = false
      state.list = action.payload;
    }
  }
})

export const getAllProducts = (state) => state.products.list;
export const getProductLoading = (state) => state.products.loading;
export const getProductError = (state) => state.products.error;

export const { updateAllProducts, fetchProducts, handleError } = slice.actions;

export default slice.reducer;