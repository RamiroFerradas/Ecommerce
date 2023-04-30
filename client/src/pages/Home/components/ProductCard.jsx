import React from "react";
import { useCart } from "../../../hooks/useCart";

const ProductCard = ({ product, handleProductSelect }) => {
  const { itemExists, handleAddToCart, handleRemoveFromCart } =
    useCart(product);

  return (
    <div
      onClick={() => handleProductSelect(product)}
      className="p-3 cursor-pointer bg-white hover:bg-gray-200 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative pb-48 overflow-hidden rounded-md">
        <img
          className="absolute h-full w-full object-cover"
          src={product.image_url}
          alt={product.name}
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="font-bold text-gray-700">${product.price}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              itemExists
                ? handleRemoveFromCart(product)
                : handleAddToCart(product);
            }}
            className="bg-gray-800 text-white px-3 py-2 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-gray-700"
          >
            {itemExists ? `Remover del carro` : `Agregar al carro`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
