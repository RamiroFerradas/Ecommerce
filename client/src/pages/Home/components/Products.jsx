import { useState } from "react";
import useFetchProducts from "../../../hooks/useFetchProducts";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import Spinner from "../../../components/Spinner";

export default function Products() {
  const { allProducts, loading } = useFetchProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="w-3/4 p-6">
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}
      <h1 className="text-xl font-medium mb-4">Lista de productos:</h1>

      {allProducts.length === 0 ? (
        <p>Ups, no se encontraron productos.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {!loading ? (
            allProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                handleProductSelect={handleProductSelect}
              />
            ))
          ) : (
            <Spinner />
          )}
        </div>
      )}
    </div>
  );
}
