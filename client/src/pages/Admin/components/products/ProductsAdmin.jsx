import React, { useState } from "react";
import useFetchProducts from "../../../../hooks/useFetchProducts";
import Card from "./Card";

export default function ProductsAdmin({
  setProductEditSelected,
  setViewFormProducts,
  viewToast,
  allProducts,
}) {
  return (
    <div className="bg-gray-100 border border-gray-400 rounded-xl p-2 w-screen md:w-full min-h-[60vh]">
      <p className="hidden md:block text-xl font-bold mb-4 text-center ">
        Productos
      </p>

      <ul className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-1  ">
        {allProducts.map((product) => (
          <Card
            setViewFormProducts={setViewFormProducts}
            setProductEditSelected={setProductEditSelected}
            product={product}
            key={product.id}
            viewToast={viewToast}
          />
        ))}
      </ul>
    </div>
  );
}
