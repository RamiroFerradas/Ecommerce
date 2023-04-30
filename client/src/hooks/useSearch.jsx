import { useEffect, useState } from "react";
import { getProducts, searchProducts } from "../redux/productsSlice";
import { useDispatch } from "react-redux";

export default function useSearch() {
  const dispatch = useDispatch();

  const [input, setinput] = useState("");

  useEffect(() => {
    dispatch(searchProducts(input));
  }, [input]);

  const handleInputChangue = (e) => {
    const searchValue = e.target.value;
    setinput(searchValue);
  };

  return { handleInputChangue, input };
}
