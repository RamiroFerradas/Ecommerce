import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const url = `/products`;

const initialState = {
  allProducts: [],
  loading: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { setAllProducts, setLoading } = productsSlice.actions;
export default productsSlice.reducer;

export const getProducts = () => async (dispatch) => {
  try {
    dispatch(setLoading()); // Inicio de carga
    const res = await axios(url);
    dispatch(setAllProducts(res.data)); // Solicitud exitosa
  } catch (error) {
    console.error(error.message);
    dispatch(setLoading()); // Error de solicitud
  }
};
