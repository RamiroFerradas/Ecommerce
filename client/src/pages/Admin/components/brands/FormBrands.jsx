import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBrand, updateBrand } from "../../../../redux/brandsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import ToggleUrlSystemImage from "../ToggleUrlSystemImage";
import Spinner from "../../../../components/Spinner";

export default function FormBrands({
  brandEditSelected,
  closeModalFormBrands,
  viewToast,
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

    if (brandData.logo_url !== "" && !regexUrl.test(brandData.logo_url)) {
      errors.logo_url = "Url inválida";
    }

    if (!brandData.name) {
      errors.name = required;
    }

    setError(errors);

    if (Object.keys(errors).length === 0) {
      if (!brandEditSelected) {
        dispatch(addBrand(brandData));
        viewToast(`marca modificad con exito`);
      } else {
        dispatch(updateBrand(brandEditSelected.id, brandData));
        viewToast(`marca modificad con exito`);
      }
      closeModalFormBrands();
    }
  };

  const [loadingFile, setLoadingFile] = useState(false);

  return (
    <div
      className="rounded-3xl fixed md:inset-0 inset-1 bg-white/90 backdrop-blur-xs h-[60%] md:w-[32vw] overflow-x-hidden overflow-y-auto m-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative float-right p-2 text-red-500 z-50">
        <button className="">
          <FontAwesomeIcon
            icon={faRectangleXmark}
            onClick={closeModalFormBrands}
          />
        </button>
      </div>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="space-y-6 justify-center items-center flex  fixed inset-0 outline-none focus:outline-none flex-col mt-5"
      >
        <div className="w-full flex justify-start flex-col items-center">
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
            className={`h-10 border border-gray-400 p-2 rounded ${
              error.name ? "pb-0 mb-0 rounded-b-none" : ""
            }`}
            value={brandData.name}
            onChange={handleInputChange}
          />
          {error.name && (
            <p className="text-red-500 whitespace-nowrap">{error.name}</p>
          )}
        </div>

        <label
          htmlFor="name"
          className="block text-gray-800 placeholder:text-gray-600 font-semibold mb-1 text-center"
        >
          Logo
        </label>
        <div className="flex flex-row justify-center items-start gap-2 overflow-hidden h-20 md:h-32 w-full">
          <div className="h-full">
            <ToggleUrlSystemImage
              data={brandData}
              setData={setBrandData}
              handleInputChange={handleInputChange}
              error={error}
              setLoadingFile={setLoadingFile}
            />
            {error?.logo_url && (
              <p className="text-red-500 whitespace-nowrap text-center">
                {error?.logo_url}
              </p>
            )}
          </div>
          {!loadingFile ? (
            <>
              {brandData.logo_url && (
                <div className="top-36 absolute right-1 overflow-hidden">
                  <img
                    src={brandData.logo_url}
                    alt={brandData.name}
                    className="h-10 w-10 md:w-16 md:h-16 rounded-full object-contain float-right"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="absolute right-5 mt-3 h-10 flex justify-cente items-center overflow-hidden">
              <Spinner />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 p-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {brandEditSelected ? ` Guardar cambios` : `Cargar`}
          </button>
          <button
            type="button"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={closeModalFormBrands}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
