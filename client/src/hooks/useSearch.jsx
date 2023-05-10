import { useEffect, useState } from "react";
import { getProducts, searchProducts } from "../redux/productsSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchUsers } from "../redux/usersSlice";

export default function useSearch() {
  const dispatch = useDispatch();

  const [input, setinput] = useState("");

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/users") {
      dispatch(searchUsers(input));
    } else {
      dispatch(searchProducts(input));
    }
  }, [input]);

  const handleInputChangue = (e) => {
    const searchValue = e.target.value;
    setinput(searchValue);
  };

  return { handleInputChangue, input };
}
