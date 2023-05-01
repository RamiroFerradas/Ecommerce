import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../../redux/productsSlice";

export default function Card({
  product,
  setViewFormProducts,
  setProductEditSelected,
}) {
  const dispatch = useDispatch();

  const handleEditProduct = (product) => {
    setViewFormProducts(true);
    setProductEditSelected(product);
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };
  return (
    <li
      key={product.id}
      className="bg-white shadow rounded-lg p-4  sm:w-full md:w-2/3 border border-gray-300 flex flex-col justify-center items-center"
    >
      <div>
        <p className="text-md font-bold text-center">{product.name}</p>
        <p className="text-md text-center">{product.brand.name}</p>
        <img src={product.image_url} alt={product.brand.name} />
        <p className="mt-2 text-gray-600 text-center">${product.price}</p>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-sm"
          onClick={(e) => {
            e.stopPropagation();
            handleEditProduct(product);
          }}
        >
          Editar
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded text-sm"
          onClick={() => handleDeleteProduct(product.id)}
        >
          Borrar
        </button>
      </div>
    </li>
  );
}
