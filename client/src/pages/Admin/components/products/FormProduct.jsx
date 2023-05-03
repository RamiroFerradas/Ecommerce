import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../../../../redux/productsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

export default function FormProduct({
  productEditSelected,
  closeModalFormProducts,
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

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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
  };
  const handleBrandInputChange = (event) => {
    const { name, value } = event.target;
    if (value !== "")
      setErrors({
        ...errors,
        brand: "",
      });
    setProductData({
      ...productData,
      brand: {
        ...productData.brand,
        [name]:
          name !== "logo_url"
            ? value.charAt(0).toUpperCase() + value.slice(1)
            : value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    const required = "Campo requerido";
    const regex = /^[a-zA-Z\s]*$/;
    if (!productData.name) {
      errors.name = required;
    }

    if (!regex.test(productData.name)) {
      errors.name = "El nombre no debe contener signos";
    }
    if (!productData.description) {
      errors.description = required;
    }
    if (!productData.image_url) {
      errors.image_url = required;
    }
    if (!productData.price) {
      errors.price = required;
    }
    if (productData.price < 0) {
      errors.price = "El valor debe ser mayor o igual a 0";
    }
    if (!productData.brand.name) {
      errors.brand = required;
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      if (!productEditSelected) {
        dispatch(addProduct(productData));
      } else {
        dispatch(updateProduct(productEditSelected.id, productData));
      }
      closeModalFormProducts();
    }
  };

  return (
    <div className="rounded-3xl fixed md:inset-0 inset-1 bg-white/90 backdrop-blur-xs h-[96vh] md:w-[50vw] overflow-x-hidden overflow-y-auto m-auto ">
      <button
        onClick={closeModalFormProducts}
        className="float-right p-2 text-red-500"
      >
        <FontAwesomeIcon icon={faRectangleXmark} />
      </button>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className=" justify-start items-center flex  fixed inset-0 outline-none focus:outline-none flex-col mt-5 md:p-1"
      >
        <div
          className="flex flex-col md:flex-row gap-10"
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
                className="w-full border border-gray-400 p-2 rounded placeholder:text-gray-600"
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
                className="w-full border border-gray-400 p-2 rounded placeholder:text-gray-600"
                value={productData.description}
                onChange={handleInputChange}
              />
              {errors.description && (
                <p className="text-red-500 text-center">{errors.description}</p>
              )}
            </div>
            <div className="min-h-[21%]">
              <label
                htmlFor="image_url"
                className="block text-gray-800 font-semibold mb-1 text-center"
              >
                URL de la imagen
              </label>
              <input
                type="text"
                name="image_url"
                id="image_url"
                placeholder="Ingresa la URL de la imagen"
                className="w-full border border-gray-400 p-2 rounded placeholder:text-gray-600"
                value={productData.image_url}
                onChange={handleInputChange}
              />
              {errors.image_url && (
                <p className="text-red-500 text-center">{errors.image_url}</p>
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
                className="w-full border border-gray-400 p-2 rounded placeholder:text-gray-600"
                value={productData.price}
                onChange={handleInputChange}
              />
              {errors.price && (
                <p className="text-red-500 text-center">{errors.price}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="min-h-[21%]">
              <label
                htmlFor="name"
                className="block text-gray-800 font-semibold mb-1 text-center"
              >
                Marca
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Ingresa el nombre de la marca"
                className="w-full border placeholder:text-gray-600 border-gray-400 p-2 rounded"
                value={productData.brand.name}
                onChange={handleBrandInputChange}
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
                className="w-full border border-gray-400 p-2 rounded placeholder:text-gray-600"
                value={productData.brand.logo_url}
                onChange={handleBrandInputChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-2  w-full h-32 items-end">
          <button
            type="button"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded h-10"
            onClick={closeModalFormProducts}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="  h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {productEditSelected ? ` Guardar cambios` : `Cargar`}
          </button>
        </div>
      </form>
    </div>
  );
}
