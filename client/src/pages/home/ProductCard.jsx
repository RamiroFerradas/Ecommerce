import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative pb-48 overflow-hidden">
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
          <button className="bg-gray-800 text-white px-3 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
