import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../redux/productsSlice";

export default function Card({ product, setViewForm, setProductEditSelected }) {
  const dispatch = useDispatch();
  const handleEditProduct = (product) => {
    setViewForm(true);
    setProductEditSelected(product);
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };
  return (
    <li
      key={product.id}
      className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
    >
      <div>
        <h2 className="text-lg font-bold">{product.name}</h2>
        <img src={product.image_url} alt="" />
        <p className="mt-2 text-gray-600">{product.price}</p>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={(e) => {
            e.stopPropagation();
            handleEditProduct(product);
          }}
        >
          Editar
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDeleteProduct(product.id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}
