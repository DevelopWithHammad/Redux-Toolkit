import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "../services/apiServices";
import cartReducer from "../../store/slices/cartReducer";
import wishListReducer from "../../store/slices/wishListReducer";

export const store = configureStore({
    reducer: {
        [apiService.reducerPath]: apiService.reducer,
        cartItems: cartReducer,
        wishList: wishListReducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        apiService.middleware,
    ]
});