import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productsSlice";

export default function useFetchProducts() {
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector(({ products }) => products);

  useEffect(() => {
    !allProducts.length && dispatch(getProducts());
  }, [allProducts.length, dispatch]);
  return { allProducts, loading };
}
