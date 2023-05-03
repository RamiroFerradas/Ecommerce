import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBrand, updateBrand } from "../../../../redux/brandsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

export default function FormBrands({
  brandEditSelected,
  closeModalFormBrands,
}) {
  const dispatch = useDispatch();
  const [brandData, setBrandData] = useState({
    name: brandEditSelected ? brandEditSelected.name : "",
    logo_url: brandEditSelected ? brandEditSelected.logo_url : "",
  });

  const [error, setError] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (value !== "")
      setError({
        ...error,
        [name]: "",
      });
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

    const errors = {};
    const required = "Campo requerido";
    const regexUrl = new RegExp(
      /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i
    );

    if (!regexUrl.test(brandData.logo_url)) {
      errors.logo_url = "Url inválida";
    }
    if (!brandData.logo_url != "") {
      errors.logo_url = "";
    }

    if (!brandData.name) {
      errors.name = required;
    }

    setError(errors);

    if (Object.keys(errors).length === 0) {
      if (!brandEditSelected) {
        dispatch(addBrand(brandData));
      } else {
        dispatch(updateBrand(brandEditSelected.id, brandData));
      }
      closeModalFormBrands();
    }
  };

  return (
    <div
      className="rounded-3xl fixed md:inset-0 inset-1 bg-white/90 backdrop-blur-xs h-[50vh] md:w-[30vw] overflow-x-hidden overflow-y-auto m-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="float-right text-red-500">
        <button onClick={closeModalFormBrands} className="p-2">
          <FontAwesomeIcon icon={faRectangleXmark} />
        </button>
      </div>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="space-y-6 justify-center items-center flex  fixed inset-0 outline-none focus:outline-none flex-col mt-5"
      >
        <div className="h-24 w-full flex justify-start flex-col items-center">
          <label
            htmlFor="name"
            className="block text-gray-800 placeholder:text-gray-600 font-semibold mb-1 text-center"
          >
            Marca
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Ingresa el nombre de la marca"
            className={`h-10 w-ful  border border-gray-400 p-2 rounded ${
              error.name ? "pb-0 mb-0 rounded-b-none" : ""
            }`}
            value={brandData.name}
            onChange={handleInputChange}
          />
          {error.name && (
            <p className="text-red-500 whitespace-nowrap">{error.name}</p>
          )}
        </div>
        <div className="h-24 ">
          <label
            htmlFor="logo_url"
            className="block text-gray-800 placeholder:text-gray-600 font-semibold mb-1 text-center"
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
          {error.logo_url && (
            <p className="text-red-500 whitespace-nowrap text-center">
              {error.logo_url}
            </p>
          )}
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
