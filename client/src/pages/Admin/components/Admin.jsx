import { useState } from "react";
import useFetchProducts from "../../../hooks/useFetchProducts";
import Card from "./Card";
import FormProduct from "./FormProduct";

export default function Admin() {
  const { allProducts } = useFetchProducts();

  const [productEditSelected, setProductEditSelected] = useState(false);

  const [viewForm, setViewForm] = useState(false);

  const closeModal = () => {
    setViewForm(false);
    setProductEditSelected(false);
  };

  return (
    <div className="container mx-auto px-4" onClick={closeModal}>
      <div className="flex justify-between items-center py-2">
        <div className="w-20"></div>
        <p className="text-2xl font-bold mb-4 flex-grow text-center">
          Panel de administracion
        </p>
        <button
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
          onClick={(e) => {
            e.stopPropagation();
            setViewForm(true);
          }}
        >
          Cargar producto
        </button>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allProducts.map((product) => (
          <Card
            setViewForm={setViewForm}
            setProductEditSelected={setProductEditSelected}
            product={product}
            key={product.id}
          />
        ))}
      </ul>
      {viewForm ? (
        <FormProduct
          productEditSelected={productEditSelected}
          closeModal={closeModal}
        />
      ) : (
        false
      )}
    </div>
  );
}
