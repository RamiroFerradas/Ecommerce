import { useState } from "react";
import useFetchProducts from "../../../hooks/useFetchProducts";
import Card from "./products/Card";
import FormProduct from "./products/FormProduct";
import useFetchBrands from "../../../hooks/useFetchBrands";
import BrandsAdmin from "./brands/BrandsAdmin";
import ProductsAdmin from "./products/ProductsAdmin";
import FormBrands from "./brands/FormBrands";

export default function Admin() {
  const [productEditSelected, setProductEditSelected] = useState(false);
  const [brandEditSelected, setbrandEditSelected] = useState(false);

  const [viewFormProducts, setViewFormProducts] = useState(false);
  const [viewFormBrands, setViewFormBrands] = useState(true);

  const closeModalFormProducts = () => {
    setViewFormProducts(false);
    setProductEditSelected(false);
  };
  const closeModalFormBrands = () => {
    setViewFormBrands(false);
    setbrandEditSelected(false);
  };

  return (
    <div
      className="container mx-auto px-4 back"
      onClick={() => {
        closeModalFormProducts();
        closeModalFormBrands();
      }}
    >
      <div className="flex justify-between items-center py-2">
        <button
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
          onClick={(e) => {
            e.stopPropagation();
            setViewFormProducts(false);
            setViewFormBrands(true);
          }}
        >
          Cargar marca
        </button>

        <p className="text-2xl font-bol mb-4 flex-grow text-center">
          Panel de administrracion
        </p>
        <button
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
          onClick={(e) => {
            e.stopPropagation();
            setViewFormProducts(true);
            setViewFormBrands(false);
          }}
        >
          Cargar producto
        </button>
      </div>
      <div className="flex gap-5 ">
        <BrandsAdmin
          setbrandEditSelected={setbrandEditSelected}
          setViewFormBrands={setViewFormBrands}
        />
        <ProductsAdmin
          setProductEditSelected={setProductEditSelected}
          setViewFormProducts={setViewFormProducts}
        />
      </div>

      {viewFormProducts ? (
        <FormProduct
          productEditSelected={productEditSelected}
          closeModalFormProducts={closeModalFormProducts}
        />
      ) : (
        false
      )}
      {viewFormBrands ? (
        <FormBrands
          brandEditSelected={brandEditSelected}
          closeModalFormBrands={closeModalFormBrands}
        />
      ) : (
        false
      )}
    </div>
  );
}
