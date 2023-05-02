import { useRef, useState } from "react";
import FormProduct from "./products/FormProduct";
import BrandsAdmin from "./brands/BrandsAdmin";
import ProductsAdmin from "./products/ProductsAdmin";
import FormBrands from "./brands/FormBrands";
import ToggleProductBrand from "./ToggleProductBrand";

export default function Admin() {
  const [productEditSelected, setProductEditSelected] = useState(false);
  const [brandEditSelected, setbrandEditSelected] = useState(false);

  const [viewFormProducts, setViewFormProducts] = useState(false);
  const [viewFormBrands, setViewFormBrands] = useState(false);

  const closeModalFormProducts = () => {
    setViewFormProducts(false);
    setProductEditSelected(false);
  };
  const closeModalFormBrands = () => {
    setViewFormBrands(false);
    setbrandEditSelected(false);
  };

  const refProductsAdmin = useRef();
  const refBrandsAdmin = useRef();

  return (
    <div
      className="container mx-auto px-4 back flex justify-center items-center flex-col"
      onClick={() => {
        closeModalFormProducts();
        closeModalFormBrands();
      }}
    >
      <div className="flex flex-row justify-around w-full items-center py-2 md:gap-0 gap-16">
        <button
          className="bg-green-500 hover:bg-green-400 text-white font-bold md:py-2 md:px-4 py-1 px-3 text-sm  rounded"
          onClick={(e) => {
            e.stopPropagation();
            setViewFormProducts(false);
            setViewFormBrands(true);
          }}
        >
          Cargar marca
        </button>

        <p className="md:text-2xl text-md font-bol mb-4 flex-grow text-center">
          Panel de administracion
        </p>
        <button
          className="bg-green-500 hover:bg-green-400 text-white font-bold md:py-2 md:px-4 py-1 px-3 text-sm rounded"
          onClick={(e) => {
            e.stopPropagation();
            setViewFormProducts(true);
            setViewFormBrands(false);
          }}
        >
          Cargar producto
        </button>
      </div>

      <div className="gap-5 w-screen md:w-aut md:p-0 p-auto flex justify-center items-center md:flex-row flex-col">
        <ToggleProductBrand
          refProductsAdmin={refProductsAdmin}
          refBrandsAdmin={refBrandsAdmin}
        />

        <div ref={refBrandsAdmin} className="hidden md:block ">
          <BrandsAdmin
            setbrandEditSelected={setbrandEditSelected}
            setViewFormBrands={setViewFormBrands}
          />
        </div>
        <div ref={refProductsAdmin} className="md:block">
          <ProductsAdmin
            setProductEditSelected={setProductEditSelected}
            setViewFormProducts={setViewFormProducts}
          />
        </div>
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