import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../redux/brandsSlice";

export default function useFetchBrands() {
  const dispatch = useDispatch();
  const { allBrands, loading } = useSelector(({ brands }) => brands);

  useEffect(() => {
    !allBrands.length && dispatch(getBrands());
  }, [allBrands.length, dispatch]);
  return { allBrands, loading };
}
