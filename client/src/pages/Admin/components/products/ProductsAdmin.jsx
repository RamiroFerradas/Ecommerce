import React from "react";
import useFetchProducts from "../../../../hooks/useFetchProducts";
import Card from "./Card";

export default function ProductsAdmin({
  setProductEditSelected,
  setViewFormProducts,
}) {
  const { allProducts } = useFetchProducts();
  return (
    <div className="bg-gray-100 border border-gray-400 rounded-xl p-2 w-full">
      <p className="hidden md:block text-xl font-bold mb-4 text-center ">
        Productos
      </p>

      <ul className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-6 gap-4  ">
        {allProducts.map((product) => (
          <Card
            setViewFormProducts={setViewFormProducts}
            setProductEditSelected={setProductEditSelected}
            product={product}
            key={product.id}
          />
        ))}
      </ul>
    </div>
  );
}
