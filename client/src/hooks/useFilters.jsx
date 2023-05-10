import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterProductsByBrand, sortProducts } from "../redux/productsSlice";
import { useLocation } from "react-router-dom";
import { filterUsersByRole, sortUsers } from "../redux/usersSlice";

export default function useFilters() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const [selectedCheckbox, setSelectedCheckbox] = useState("all");
  const [orderType, setOrderType] = useState({
    price: "",
    alphabetically: "",
  });

  const filterProducts = () => {
    if (pathname === "/users") {
      dispatch(sortUsers(orderType.alphabetically));
      dispatch(filterUsersByRole(selectedCheckbox));
    } else {
      dispatch(filterProductsByBrand(selectedCheckbox));
      dispatch(sortProducts(orderType));
    }
  };

  useEffect(() => {
    filterProducts();
  }, [selectedCheckbox, orderType]);

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;
    let newValue = checked ? value : "";

    setOrderType({
      ...orderType,
      [name]: newValue,
    });
  };

  return {
    setSelectedCheckbox,
    setOrderType,
    orderType,
    handleCheckboxChange,
    selectedCheckbox,
  };
}
