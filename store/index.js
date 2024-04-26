// import productsReducer from './slices/productsReducer'

import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { fetchCartData } from './slices/cartReducer';
import productsReducer from './slices/productsReducer';
import wishListReducer from './slices/wishListReducer';
import { logger } from './middleware/logger';
// import { apiService } from './middleware/apiService';
import { thunkMiddleware } from './middleware/thunk';



export const store = configureStore({
  reducer: {
    products: productsReducer,
    cartItems: cartReducer,
    wishList: wishListReducer,
  },
  middleware: () => [fetchCartData]
})