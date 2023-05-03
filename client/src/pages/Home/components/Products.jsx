import { useState } from "react";
import useFetchProducts from "../../../hooks/useFetchProducts";
import ProductCard from "./ProductCard";
import Spinner from "../../../components/Spinner";
import ProductDetail from "./ProductDetail";
export default function Products() {
  const { allProducts, loading } = useFetchProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full md:w-3/4 p-6">
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}

      {loading ? (
        <Spinner />
      ) : !currentProducts.length ? (
        <div className="h-80 flex justify-center items-center">
          <p>Ups, no se encontraron productos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleProductSelect={handleProductSelect}
            />
          ))}
        </div>
      )}

      {allProducts.length > productsPerPage && (
        <div className="flex justify-center items-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({
            length: Math.ceil(allProducts.length / productsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              className={`mx-1 py-1 px-2 rounded hover:bg-blue-500 hover:text-white focus:outline-none ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentProducts.length < productsPerPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
