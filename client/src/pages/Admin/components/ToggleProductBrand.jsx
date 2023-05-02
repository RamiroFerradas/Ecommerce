import React, { useState } from "react";

export default function ToggleProductBrand({
  refProductsAdmin,
  refBrandsAdmin,
}) {
  const [toggleProductBrand, setToggleProductBrand] = useState("Productos");

  const handleToggle = (option) => {
    setToggleProductBrand(option);
    handleSelect(option);
  };

  const handleSelect = (option) => {
    if (option === "Marcas") {
      refBrandsAdmin.current.classList.remove("hidden");
      refProductsAdmin.current.classList.add("hidden");
    } else if (option === "Productos") {
      refBrandsAdmin.current.classList.add("hidden");
      refProductsAdmin.current.classList.remove("hidden");
    }
  };

  return (
    <div className="flex justify-center">
      <button
        className={`${
          toggleProductBrand === "Productos"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-600"
        } px-4 py-2 rounded-l-md focus:outline-none`}
        onClick={() => handleToggle("Productos")}
      >
        Productos
      </button>
      <button
        className={`${
          toggleProductBrand === "Marcas"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-600"
        } px-4 py-2 rounded-r-md focus:outline-none`}
        onClick={() => handleToggle("Marcas")}
      >
        Marcas
      </button>
    </div>
  );
}
