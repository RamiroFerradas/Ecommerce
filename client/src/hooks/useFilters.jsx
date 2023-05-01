import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterProductsByBrand, sortProducts } from "../redux/productsSlice";

export default function useFilters() {
  const dispatch = useDispatch();

  const [selectedBrand, setSelectedBrand] = useState("all");
  const [orderType, setOrderType] = useState({
    price: "",
    alphabetically: "",
  });

  const filterProducts = () => {
    dispatch(filterProductsByBrand(selectedBrand));
    dispatch(sortProducts(orderType));
  };
  useEffect(() => {
    filterProducts();
  }, [selectedBrand, orderType]);

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;
    let newValue = checked ? value : "";

    // if (name === "alphabetically" && !checked) {
    //   newValue = "a-z";
    // }

    // Si la propiedad opuesta ya tiene un valor, establecerla en una cadena vacía
    if (name === "price" && orderType.alphabetically) {
      setOrderType({
        ...orderType,
        [name]: newValue,
        alphabetically: "",
      });
    } else if (name === "alphabetically" && orderType.price) {
      setOrderType({
        ...orderType,
        [name]: newValue,
        price: "",
      });
    } else {
      setOrderType({
        ...orderType,
        [name]: newValue,
      });
    }
  };

  return {
    setSelectedBrand,
    setOrderType,
    orderType,
    handleCheckboxChange,
    selectedBrand,
  };
}
