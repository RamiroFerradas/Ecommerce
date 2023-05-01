import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../../../../redux/productsSlice";

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
    category: productEditSelected ? productEditSelected.category : "",
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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

    if (!productEditSelected) {
      dispatch(addProduct(productData));
    } else {
      dispatch(updateProduct(productEditSelected.id, productData));
    }
    closeModalFormProducts();
  };

  return (
    <div
      className="rounded-3xl fixed m-auto inset-0 bg-black/80 backdrop-blur-xs h-[90vh] w-[50vw] overflow-x-hidden overflow-y-auto scrollbar-auto-hide"
      onClick={(e) => e.stopPropagation()}
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="space-y-6 justify-center items-center flex  fixed inset-0 outline-none focus:outline-none flex-col"
      >
        <div className="flex flex-row gap-10">
          <div className="flex flex-col space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-200 font-semibold mb-1 text-center"
              >
                Nombre del producto
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Ingresa el nombre del producto"
                className="w-full border border-gray-400 p-2 rounded"
                value={productData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="description"
                className="block text-gray-200 font-semibold mb-1 text-center"
              >
                Descripción del producto
              </label>
              <textarea
                name="description"
                id="description"
                rows="3"
                placeholder="Ingresa la descripción del producto"
                className="w-full border border-gray-400 p-2 rounded"
                value={productData.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="image_url"
                className="block text-gray-200 font-semibold mb-1 text-center"
              >
                URL de la imagen
              </label>
              <input
                type="text"
                name="image_url"
                id="image_url"
                placeholder="Ingresa la URL de la imagen"
                className="w-full border border-gray-400 p-2 rounded"
                value={productData.image_url}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-gray-200 font-semibold mb-1 text-center"
              >
                Precio
              </label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Ingresa el precio del producto"
                className="w-full border border-gray-400 p-2 rounded"
                value={productData.price}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-6">
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
                value={productData.brand.name}
                onChange={handleBrandInputChange}
              />
            </div>
            <div className="flex-1">
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
                value={productData.brand.logo_url}
                onChange={handleBrandInputChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={closeModalFormProducts}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {productEditSelected ? ` Guardar cambios` : `Cargar`}
          </button>
        </div>
      </form>
    </div>
  );
}
