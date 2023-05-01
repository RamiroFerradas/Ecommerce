import React from "react";
import useFetchBrands from "../../../../hooks/useFetchBrands";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { deleteBrand } from "../../../../redux/brandsSlice";

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

  const handleDeleteProduct = (brandId) => {
    dispatch(deleteBrand(brandId));
  };

  return (
    <div className="w-1/5 bg-gray-100 border border-gray-400 rounded-xl p-6">
      <p className="text-xl font-bold mb-4 text-center ">Marcas</p>
      <ul className="flex flex-col gap-3">
        {allBrands.map((brand) => (
          <li key={brand.id} className="flex">
            <p>{brand.name}</p>
            <div className="flex items-end gap-2 ml-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditBrand(brand);
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>

              <button onClick={() => handleDeleteProduct(brand.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
