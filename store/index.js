// import productsReducer from './slices/productsReducer'

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartReducer';
import productsReducer from './slices/productsReducer';
import wishListReducer from './slices/wishListReducer';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cartItems: cartReducer,
    wishList: wishListReducer,
  }
})

// console.log(store)

// store.dispatch(addCartItem(1))
// store.dispatch(addCartItem(12))

// store.dispatch(increaseCartItemQuantity(12))

// store.dispatch(decreaseCartItemQuantity(12))
// store.dispatch(decreaseCartItemQuantity(12))

// store.dispatch(addWishListItem(18))
// store.dispatch(addWishListItem(11))

// store.dispatch(removeWishListItem(11))
// store.dispatch(removeWishListItem(18))


// import { combineReducers, createStore } from 'redux'

// import cartReducer, {
//   addCartItem,
//   decreaseCartItemQuantity,
//   increaseCartItemQuantity,
// } from './slices/cartReducer'
// import wishListReducer, {
//   addWishListItem,
//   removeWishListItem,
// } from './slices/wishListReducer'
// import { produce } from 'immer'

// const reducer = combineReducers({
//   products: productsReducer,
//   cartItems: cartReducer,
//   wishList: wishListReducer,
// })

// export const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__?.()
// )