import useFetchProducts from "../../hooks/useFetchProducts";
import ProductCard from "./ProductCard";
import Spinner from "./Spinner";

export default function Products() {
  const { allProducts, loading } = useFetchProducts();

  return (
    <div className="w-3/4 p-6">
      <h1 className="text-xl font-medium mb-4">Lista de productos:</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!loading ? (
          allProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
