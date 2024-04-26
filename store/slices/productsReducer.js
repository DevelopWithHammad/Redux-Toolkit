import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchProductData = createAsyncThunk('cart/fetchProducts', async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    return response.json();
  } catch (err) {
    throw err
  }
})

const slice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    error: '',
    list: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload.products
      })
      .addCase(fetchProductData.rejected, (state) => {
        state.loading = false
        state.error = "Something went wrong"
      })
  }
})

export const productDispatcher = () => (dispatch) => {
  dispatch(fetchProducts())
  fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((data) => {
      dispatch(updateAllProducts(data))
    }).catch(() => {
      dispatch(handleError())
    })
}

export const getAllProducts = (state) => state.products.list;
export const getProductLoading = (state) => state.products.loading;
export const getProductError = (state) => state.products.error;

export const { updateAllProducts, fetchProducts, handleError } = slice.actions;

export default slice.reducer;