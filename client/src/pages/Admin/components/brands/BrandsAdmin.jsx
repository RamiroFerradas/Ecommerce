import React, { useState } from "react";
import useFetchBrands from "../../../../hooks/useFetchBrands";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { deleteBrand } from "../../../../redux/brandsSlice";
import Toast from "../../../../components/Toast";
import Swal from "sweetalert2";

export default function BrandsAdmin({
  setbrandEditSelected,
  setViewFormBrands,
}) {
  const { allBrands } = useFetchBrands();
  const dispatch = useDispatch();

  const handleEditBrand = (brand) => {
    setViewFormBrands(true);
    setbrandEditSelected(brand);
  };

  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");

  const handleDeleteBrand = (brand) => {
    Swal.fire({
      title: "Eliminar marca",
      text: `Desea eliminar ${brand.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "##3B82F6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBrand(brand.id));
        setMessageToast(`Se eliminó la marca ${brand.name}`);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setMessageToast("");
        }, 3000);
      }
    });
  };

  return (
    <div className="h-auto md:min-h-[60vh] bg-red-gray border border-gray-400 rounded-xl p-6 w-72 bg-gray-100">
      <Toast show={showToast} message={messageToast} />
      <p className="hidden md:block text-xl font-bold mb-4 text-center ">
        Marcas
      </p>
      <ul className="flex flex-col gap-3">
        {allBrands.map((brand) => (
          <li key={brand.id} className="flex p-2 md:p-0">
            <img
              src={brand.logo_url}
              alt={brand.name}
              className="w-6 h-6 object-cover rounded-full mr-2"
            />
            <p>{brand.name}</p>
            <div className="flex items-end gap-2 ml-auto text-lg md:text-sm">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditBrand(brand);
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>

              <button onClick={() => handleDeleteBrand(brand)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
