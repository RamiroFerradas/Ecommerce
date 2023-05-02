import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBrand, updateBrand } from "../../../../redux/brandsSlice";

export default function FormBrands({
  brandEditSelected,
  closeModalFormBrands,
}) {
  const dispatch = useDispatch();
  const [brandData, setBrandData] = useState({
    name: brandEditSelected ? brandEditSelected.name : "",
    logo_url: brandEditSelected ? brandEditSelected.logo_url : "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBrandData({
      ...brandData,

      [name]:
        name !== "logo_url"
          ? value.charAt(0).toUpperCase() + value.slice(1)
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!brandEditSelected) {
      dispatch(addBrand(brandData));
    } else {
      dispatch(updateBrand(brandEditSelected.id, brandData));
    }
    closeModalFormBrands();
  };

  return (
    <div
      className="rounded-3xl fixed md:inset-0 inset-1 bg-black/80 backdrop-blur-xs h-[45vh] md:w-[30vw] overflow-x-hidden overflow-y-auto m-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="space-y-6 justify-center items-center flex  fixed inset-0 outline-none focus:outline-none flex-col mt-5"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-gray-200 font-semibold mb-1 text-center"
          >
            Marca
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Ingresa el nombre de la marca"
            className="w-full border border-gray-400 p-2 rounded"
            value={brandData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="">
          <label
            htmlFor="logo_url"
            className="block text-gray-200 font-semibold mb-1 text-center"
          >
            URL del logo de la marca
          </label>
          <input
            type="text"
            name="logo_url"
            id="logo_url"
            placeholder="Ingresa la URL del logo de la marca"
            className="w-full border border-gray-400 p-2 rounded"
            value={brandData.logo_url}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={closeModalFormBrands}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {brandEditSelected ? ` Guardar cambios` : `Cargar`}
          </button>
        </div>
      </form>
    </div>
  );
}
