import { useState } from "react";
import useFetchBrands from "../../../hooks/useFetchBrands";
import useFilters from "../../../hooks/useFilters";

export default function Sidebar() {
  const { allBrands } = useFetchBrands();
  const { orderType, handleCheckboxChange, setSelectedBrand, selectedBrand } =
    useFilters();

  const handleSelectAllBrands = () => {
    if (selectedBrand === "all") {
      setSelectedBrand(null);
    } else {
      setSelectedBrand("all");
    }
  };

  const isAllBrandsSelected = selectedBrand === "all";
  const isAnyBrandSelected = selectedBrand !== "all";

  return (
    <div
      id="sidebar_menu"
      className="hidden md:block md:relative rounded-e-2xl md:rounded-none absolute z-40 bg-blue-100 w-[42vw] md:w-1/5 md:bg-gray-200 transition-all duration-500 left-0"
    >
      <div className="border-b-2 border-gray-200 py-4 px-6">
        <h1 className="text-xl font-medium ">Filtrar</h1>
      </div>
      <div className="px-6 py-2">
        <h2 className="text-lg font-medium mb-4">Marcas</h2>
        <ul className="space-y-2 overflow-y-auto h-52">
          <li>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={isAllBrandsSelected}
                onChange={() => handleSelectAllBrands()}
                disabled={!isAnyBrandSelected}
              />
              <span className="ml-2">Todas</span>
            </label>
          </li>
          {allBrands?.map(({ name, id }) => (
            <li key={id}>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedBrand === name}
                  onChange={() => setSelectedBrand(name)}
                />
                <span className="ml-2">{name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-b-2 border-gray-200 py-4 px-6">
        <h1 className="text-xl font-medium mb-">Ordenar</h1>
      </div>
      <div className="px-6 py-2">
        <h2 className="text-md font-medium mb-4">Alfabeticamente</h2>
        <div className="space-y-2 flex flex-col">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              value="a-z"
              name="alphabetically"
              checked={orderType.alphabetically === "a-z"}
              onChange={handleCheckboxChange}
            />
            <span className="ml-2">A-Z</span>

            <input
              type="checkbox"
              className="form-checkbox"
              value="z-a"
              name="alphabetically"
              checked={orderType.alphabetically === "z-a"}
              onChange={handleCheckboxChange}
            />
            <span className="ml-2">Z-A</span>
          </label>
        </div>
      </div>
      <div className="px-6 py-2">
        <h2 className="text-md font-medium mb-4">Precio</h2>
        <div className="space-y-2 flex flex-col">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              value="high"
              name="price"
              checked={orderType.price === "high"}
              onChange={handleCheckboxChange}
            />
            <span className="ml-2">Mayor</span>

            <input
              type="checkbox"
              className="form-checkbox"
              value="low"
              name="price"
              checked={orderType.price === "low"}
              onChange={handleCheckboxChange}
            />
            <span className="ml-2">Menor</span>
          </label>
        </div>
      </div>
    </div>
  );
}
