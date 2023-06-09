import { useRef, useState } from "react";
import FormProduct from "./products/FormProduct";
import BrandsAdmin from "./brands/BrandsAdmin";
import ProductsAdmin from "./products/ProductsAdmin";
import FormBrands from "./brands/FormBrands";
import ToggleProductBrand from "./ToggleProductBrand";
import Toast from "../../../components/Toast";
import useFetchProducts from "../../../hooks/useFetchProducts";
import Spinner from "../../../components/Spinner";

export default function Admin() {
  const [productEditSelected, setProductEditSelected] = useState(false);
  const [brandEditSelected, setbrandEditSelected] = useState(false);
  const [viewFormProducts, setViewFormProducts] = useState(false);
  const [viewFormBrands, setViewFormBrands] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");

  const { allProducts, loading } = useFetchProducts();
  const refProductsAdmin = useRef();
  const refBrandsAdmin = useRef();

  const viewToast = (message) => {
    setMessageToast(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setMessageToast("");
    }, 3000);
  };

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
      className="container mx-auto md:mx-0 back flex justify-center items-center flex-col"
      onClick={() => {
        closeModalFormProducts();
        closeModalFormBrands();
      }}
    >
      <Toast show={showToast} message={messageToast} />

      {viewFormProducts ? (
        <div
          className="fixed top-0 w-screen z-50 inset-0 h-screen bg-black/80 md:backdrop-blur-xs"
          onClick={() => {
            closeModalFormProducts();
            closeModalFormBrands();
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <FormProduct
              productEditSelected={productEditSelected}
              closeModalFormProducts={closeModalFormProducts}
              viewToast={viewToast}
            />
          </div>
        </div>
      ) : (
        false
      )}
      {viewFormBrands ? (
        <div className="fixed inset-0 z-50 w-screen h-screen bg-black/80 md:backdrop-blur-xs">
          <FormBrands
            brandEditSelected={brandEditSelected}
            closeModalFormBrands={closeModalFormBrands}
            viewToast={viewToast}
          />
        </div>
      ) : (
        false
      )}

      <div className="flex flex-row justify-around w-full items-center py-2 px-6 md:gap- gap-16">
        <button
          className="bg-green-500 hover:bg-green-400 text-white font-bold md:py-2 md:px-6 py-1 px-3  text-sm  rounded"
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

      {loading || !allProducts.length ? (
        <Spinner />
      ) : (
        <div className="gap-14 p-auto flex justify-center items-center md:items-start md:flex-row flex-col">
          <ToggleProductBrand
            refProductsAdmin={refProductsAdmin}
            refBrandsAdmin={refBrandsAdmin}
            loading={loading}
          />

          <div ref={refBrandsAdmin} className="hidden md:block">
            <BrandsAdmin
              setbrandEditSelected={setbrandEditSelected}
              setViewFormBrands={setViewFormBrands}
              viewToast={viewToast}
            />
          </div>
          <div ref={refProductsAdmin} className="md:block min-h-[60vh]">
            <ProductsAdmin
              setProductEditSelected={setProductEditSelected}
              setViewFormProducts={setViewFormProducts}
              viewToast={viewToast}
              allProducts={allProducts}
            />
          </div>
        </div>
      )}
    </div>
  );
}
