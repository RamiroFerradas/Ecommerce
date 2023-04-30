import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice.js";
import brandsReducer from "./brandsSlice.js";
import cartReducers from "./cartSlice.js";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    brands: brandsReducer,
    cart: cartReducers,
  },
});
