import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice.js";
import brandsReducer from "./brandsSlice.js";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    brands: brandsReducer,
  },
});
