import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../../../../redux/productsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import CreatableSelect from "react-select/creatable";
import useFetchBrands from "../../../../hooks/useFetchBrands";
import ToggleUrlSystemImage from "../ToggleUrlSystemImage";
import Spinner from "../../../../components/Spinner";

export default function FormProduct({
  productEditSelected,
  closeModalFormProducts,
  viewToast,
}) {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: productEditSelected ? productEditSelected.name : "",
    description: productEditSelected ? productEditSelected.description : "",
    image_url: productEditSelected ? productEditSelected.image_url : "",
    price: productEditSelected ? productEditSelected.price : "",
    brand: {
      name:
        productEditSelected && productEditSelected.brand
          ? productEditSelected.brand.name
          : "",
      logo_url:
        productEditSelected && productEditSelected.brand
          ? productEditSelected.brand.logo_url
          : "",
    },
  });

  const { allBrands } = useFetchBrands();

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name !== "logo_url") {
      if (value !== "")
        setErrors({
          ...errors,
          [name]: "",
        });

      setProductData({
        ...productData,
        [name]:
          name !== "image_url"
            ? value.charAt(0).toUpperCase() + value.slice(1)
            : value,
      });
    } else {
      if (value === "")
        setErrors({
          ...errors,
          brandUrl: "",
        });

      setProductData({
        ...productData,
        brand: {
          ...productData.brand,
          logo_url: value,
        },
      });
    }
  };

  const handleBrandSelectChange = (item) => {
    if (item?.label !== "") {
      setErrors({
        ...errors,
        brand: "",
      });
      const selectedBrand = allBrands.find(
        (brand) => brand.name === item?.label
      );

      setProductData({
        ...productData,
        brand: {
          ...productData.brand,
          name: item?.label.charAt(0).toUpperCase() + item?.label.slice(1),
          logo_url: selectedBrand?.logo_url,
        },
      });
    } else {
      setProductData({
        ...productData,
        brand: {
          ...productData.brand,
          name: item?.label.charAt(0).toUpperCase() + item?.label.slice(1),
          logo_url: "",
        },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    const required = "Campo requerido";
    const regex = /^[\w\s"\/]+$/;
    const regexUrl = new RegExp(
      /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i
    );
    if (!productData.name) {
      errors.name = required;
    }

    if (!regex.test(productData.name)) {
      errors.name = "El nombre no debe contener signos";
    }
    if (!productData.description) {
      errors.description = required;
    }
    // if (!productData.image_url) {
    //   errors.image_url = required;
    // }
    if (!productData.price) {
      errors.price = required;
    }
    if (productData.price < 0) {
      errors.price = "El valor debe ser mayor o igual a 0";
    }
    if (!productData.brand.name) {
      errors.brand = required;
    }

    if (!regexUrl.test(productData.brand.logo_url)) {
      errors.brandUrl = "Url inválida";
    }
    if (!regexUrl.test(productData.image_url)) {
      errors.image_url = "Url inválida";
    }
    if (!productData.brand.logo_url != "") {
      errors.brandUrl = "";
    }

    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      if (!productEditSelected) {
        viewToast(`producto creado con exito`);
        dispatch(addProduct(productData));
      } else {
        viewToast(`producto modificado con exito`);
        dispatch(updateProduct(productEditSelected.id, productData));
      }
      closeModalFormProducts();
    }
  };

  const optionsBrands = allBrands.map((brand) => {
    return {
      label: brand.name,
      value: brand.id,
    };
  });

  const selectedBrandOption = optionsBrands.find(
    (option) => option.label === productData.brand.name
  );

  const [loadingFile, setLoadingFile] = useState(false);

  return (
    <div className="rounded-3xl fixed md:inset-0 inset-1 bg-white/90 backdrop-blur-xs h-[96vh] md:w-[50vw] overflow-x-hidden overflow-y-auto m-auto ">
      <div className="relative float-right p-2 text-red-500 z-50">
        <button className="">
          <FontAwesomeIcon
            icon={faRectangleXmark}
            onClick={closeModalFormProducts}
          />
        </button>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className=" justify-start items-center flex  fixed inset-0 outline-none focus:outline-none flex-col mt-5 md:p-1 "
      >
        <div
          className="flex flex-col md:flex-row gap-10  h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-5  w-80">
            <div className="min-h-[21%]">
              <label
                htmlFor="name"
                className="block text-gray-800 font-semibold mb-1 text-center"
              >
                Nombre del producto
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Ingresa el nombre del producto"
                className="w-full border border-gray-400 p-2 rounded placeholder:text-gray-600 text-center"
                value={productData.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <p className="text-red-500 text-center">{errors.name}</p>
              )}
            </div>

            <div className="min-h-[30%]">
              <label
                htmlFor="description"
                className="block text-gray-800 font-semibold mb-1 text-center"
              >
                Descripción del producto
              </label>
              <textarea
                name="description"
                id="description"
                rows="3"
                placeholder="Ingresa la descripción del producto"
                className="w-full border border-gray-400 p-2 rounded placeholder:text-gray-600 text-center"
                value={productData.description}
                onChange={handleInputChange}
              />
              {errors.description && (
                <p className="text-red-500 text-center">{errors.description}</p>
              )}
            </div>

            <div className="h-20 flex flex-row justify-center items-center gap-4 relative overflow-hidden ">
              <div className="w-full">
                <ToggleUrlSystemImage
                  data={productData}
                  setData={setProductData}
                  error={errors}
                  handleInputChange={handleInputChange}
                  setLoadingFile={setLoadingFile}
                />
                {errors?.image_url && (
                  <p className="text-red-500 whitespace-nowrap text-center">
                    {errors?.image_url}
                  </p>
                )}
              </div>

              {!loadingFile ? (
                <>
                  {productData.image_url && (
                    <img
                      src={productData.image_url}
                      alt={productData.name}
                      className="h-10 w-10 md:w-16 md:h-16 rounded-full object-contain"
                    />
                  )}
                </>
              ) : (
                <Spinner />
              )}
            </div>
            <div className="min-h-[21%]">
              <label
                htmlFor="price"
                className="block text-gray-800 font-semibold mb-1 text-center"
              >
                Precio
              </label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Ingresa el precio del producto"
                className="w-full border border-gray-400 p-2 rounded placeholder:text-gray-600 text-center"
                value={productData.price}
                onChange={handleInputChange}
              />
              {errors.price && (
                <p className="text-red-500 text-center">{errors.price}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="min-h-[21%] md:w-[22vw]">
              <label
                htmlFor="name"
                className="block text-gray-800 font-semibold mb-1 text-center"
              >
                Marca
              </label>
              <CreatableSelect
                type="text"
                name="name"
                value={selectedBrandOption}
                id="name"
                placeholder="Ingresa el nombre de la marca"
                className=" border placeholder:text-gray-600 p-2 rounded"
                onChange={handleBrandSelectChange}
                options={optionsBrands}
                isClearable
                openMenuOnClick={false}
                formatCreateLabel={(inputValue) =>
                  `Crear marca "${inputValue}"`
                }
              />

              {errors.brand && (
                <p className="text-red-500 text-center">{errors.brand}</p>
              )}
            </div>
            <div className="flex-1 ">
              <label
                htmlFor="logo_url"
                className="block text-gray-800 font-semibold mb-1 text-center"
              >
                URL del logo de la marca
              </label>
              <input
                type="text"
                name="logo_url"
                id="logo_url"
                placeholder="Ingresa la URL del logo de la marca"
                className="w-full border border-gray-400 p-2 rounded placeholder:text-gray-600 text-center"
                value={productData.brand.logo_url}
                onChange={handleInputChange}
              />
              {errors.brandUrl && (
                <p className="text-red-500 text-center">{errors.brandUrl}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-2  w-full h- items-center h-12">
          <button
            type="submit"
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-28 rounded"
          >
            {productEditSelected ? ` Guardar` : `Cargar`}
          </button>
          <button
            type="button"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-28"
            onClick={closeModalFormProducts}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
