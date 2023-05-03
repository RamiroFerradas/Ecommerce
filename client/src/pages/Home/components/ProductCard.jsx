import React from "react";
import { useCart } from "../../../hooks/useCart";
import { BsFillCartPlusFill, BsFillCartXFill } from "react-icons/bs";

const ProductCard = ({ product, handleProductSelect }) => {
  const { itemExist, handleAddToCart, handleRemoveFromCart } = useCart(product);

  return (
    <div
      onClick={() => handleProductSelect(product)}
      className="p-3 cursor-pointer bg-white hover:bg-gray-200 rounded-lg shadow-lg overflow-hidden h-30 "
    >
      <div className="relative pb-48 overflow-hidden rounded-md">
        <img
          className="absolute h-full w-full object-contain"
          src={product.image_url}
          alt={product.name}
        />
      </div>
      <div className="p-4 overflow-hidden">
        <p className="font-medium text-gray-900 text-center h-10">
          {product.name}
        </p>
        {/* <p className="text-gray-600 md:block hidden h-12 overflow-hidden">
          {product.description}
        </p> */}
        <div className="mt-4 flex items-center justify-between h-20 w-full gap-1">
          <p className="font-bold text-gray-700">${product.price}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              itemExist
                ? handleRemoveFromCart(product)
                : handleAddToCart(product);
            }}
            className={` text-white px-3 py-2 rounded-md ${
              !itemExist
                ? `bg-blue-500 hover:bg-blue-800 `
                : `bg-red-500 hover:bg-red-800`
            } focus:outline-none`}
          >
            {!itemExist ? (
              <BsFillCartPlusFill className="text-gray-200 text-2xl" />
            ) : (
              <BsFillCartXFill className="text-gray-200 text-2xl" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
