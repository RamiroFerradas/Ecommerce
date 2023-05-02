import { useState } from "react";
import useFetchProducts from "../../../hooks/useFetchProducts";
import ProductCard from "./ProductCard";
import Spinner from "../../../components/Spinner";
import ProductDetail from "./ProductDetail";

export default function Products() {
  const { allProducts, loading } = useFetchProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="w-full md:w-3/4 p-6">
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}
      {/* <h1 className="text-xl font-medium mb-4 text-center">
    Lista de productos:
  </h1> */}

      {loading ? (
        <Spinner />
      ) : !allProducts.length ? (
        <div className="h-80 flex justify-center items-center">
          <p>Ups, no se encontraron productos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleProductSelect={handleProductSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
