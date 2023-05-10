import { useState } from "react";
import useFetchBrands from "../hooks/useFetchBrands";
import useFilters from "../hooks/useFilters";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const { allBrands } = useFetchBrands();
  const {
    orderType,
    handleCheckboxChange,
    setSelectedCheckbox,
    selectedCheckbox,
  } = useFilters();

  const handleSelectAllBrands = () => {
    if (selectedCheckbox === "all") {
      setSelectedCheckbox(null);
    } else {
      setSelectedCheckbox("all");
    }
  };

  const isAllBrandsSelected = selectedCheckbox === "all";
  const isAnyBrandSelected = selectedCheckbox !== "all";

  const { pathname } = useLocation();

  const rols = [
    { value: "administrador", name: "Administrador" },
    { value: "usuario", name: "Usuario" },
    { value: "invitado", name: "Invitado" },
  ];

  const pathnameUsers = pathname !== "/users" ? false : true;
  const filterValue = !pathnameUsers ? allBrands : rols;

  return (
    <div
      id="sidebar_menu"
      className={`hidden md:block md:relative rounded-e-2xl md:rounded-none absolute z-40 bg-blue-100 md:w-full bg-gray-100 md:border-0 border-y-2 border-r-2 border-blue-200/50 transition-all duration-500 left-0 md:h-screen`}
    >
      <div className="border-b-2 border-gray-200 py-4 px-6">
        <h1 className="text-xl font-medium ">Filtrar</h1>
      </div>
      <div className="px-6 py-2">
        <h2 className="text-lg font-bold mb-4">
          {pathnameUsers ? `Roles` : `Marcas`}
        </h2>
        <ul className="space-y-2 overflow-y-auto min-h-[4rem] max-h-52">
          <li>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={isAllBrandsSelected}
                onChange={() => handleSelectAllBrands()}
                disabled={!isAnyBrandSelected}
              />
              <span className="ml-2">{pathnameUsers ? `Todos` : `Todas`}</span>
            </label>
          </li>
          {filterValue?.map(({ name, id }) => (
            <li key={id}>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedCheckbox === name}
                  onChange={() => setSelectedCheckbox(name)}
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
        <h2 className="text-md font-bold mb-4">Alfabeticamente</h2>
        <div className="space-y-2 flex flex-col">
          <div className="inline-flex items-center">
            <div className="inline-flex items-center gap-2">
              <label htmlFor="">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  value="a-z"
                  name="alphabetically"
                  checked={orderType.alphabetically === "a-z"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-2">A-Z</span>
              </label>
              <label htmlFor="">
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
        </div>
      </div>
      {!pathnameUsers ? (
        <div className="px-6 py-2">
          <h2 className="text-md font-bold mb-4">Precio</h2>
          <div className="space-y-2 flex flex-col">
            <div className="inline-flex items-center gap-2">
              <label htmlFor="">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  value="high"
                  name="price"
                  checked={orderType.price === "high"}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-2">Mayor</span>
              </label>
              <label htmlFor="">
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
      ) : (
        false
      )}
    </div>
  );
}
