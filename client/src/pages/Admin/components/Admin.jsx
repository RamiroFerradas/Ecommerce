import { useRef, useState } from "react";
import FormProduct from "./products/FormProduct";
import BrandsAdmin from "./brands/BrandsAdmin";
import ProductsAdmin from "./products/ProductsAdmin";
import FormBrands from "./brands/FormBrands";
import ToggleProductBrand from "./ToggleProductBrand";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Toast from "../../../components/Toast";

export default function Admin() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const [productEditSelected, setProductEditSelected] = useState(false);
  const [brandEditSelected, setbrandEditSelected] = useState(false);
  const [viewFormProducts, setViewFormProducts] = useState(false);
  const [viewFormBrands, setViewFormBrands] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");

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

  const refProductsAdmin = useRef();
  const refBrandsAdmin = useRef();

  return !isAuthenticated ? (
    navigate("/")
  ) : (
    <div
      className="container mx-auto md:mx-0 px-4 back flex justify-center items-center flex-col"
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

      <div className="flex flex-row justify-around w-10/12 items-center py-2 md:gap- gap-16">
        <button
          className="bg-green-500 hover:bg-green-400 text-white font-bold md:py-2 md:px-4 py-1 px-3  text-sm  rounded"
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

      <div className="gap-14 p-auto flex justify-center items-center md:items-start md:flex-row flex-col w-full">
        <ToggleProductBrand
          refProductsAdmin={refProductsAdmin}
          refBrandsAdmin={refBrandsAdmin}
        />

        <div ref={refBrandsAdmin} className="hidden md:block //md:w-1/5">
          <BrandsAdmin
            setbrandEditSelected={setbrandEditSelected}
            setViewFormBrands={setViewFormBrands}
            viewToast={viewToast}
          />
        </div>
        <div
          ref={refProductsAdmin}
          className="md:block min-h-[60vh] //md:w-4/5"
        >
          <ProductsAdmin
            setProductEditSelected={setProductEditSelected}
            setViewFormProducts={setViewFormProducts}
            viewToast={viewToast}
          />
        </div>
      </div>
    </div>
  );
}
