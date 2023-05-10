import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

import productsReducer from "./productsSlice.js";
import brandsReducer from "./brandsSlice.js";
import cartReducer from "./cartSlice.js";
import usersReducer from "./usersSlice.js";

const persistConfig = {
  key: "items",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    products: productsReducer,
    brands: brandsReducer,
    cart: persistedCartReducer,
    users: usersReducer,
  },
});

export const persistor = persistStore(store);
