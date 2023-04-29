import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const url = `/brands`;

const initialState = {
  allBrands: [],
  loading: false,
};

export const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setAllBrands: (state, action) => {
      state.allBrands = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { setAllBrands, setLoading } = brandsSlice.actions;
export default brandsSlice.reducer;

export const getBrands = () => async (dispatch) => {
  try {
    dispatch(setLoading()); // Inicio de carga
    const res = await axios(url, {
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: "my-secret-token",
      // },
    });

    dispatch(setAllBrands(res.data)); // Solicitud exitosa
  } catch (error) {
    console.error(error.message);
    dispatch(setLoading()); // Error de solicitud
  }
};
