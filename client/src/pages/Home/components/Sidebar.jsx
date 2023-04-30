import { useDispatch } from "react-redux";
import useFetchBrands from "../../../hooks/useFetchBrands";
import { useState } from "react";
import { filterProductsByBrand } from "../../../redux/productsSlice";

export default function Sidebar() {
  const { allBrands } = useFetchBrands();
  const dispatch = useDispatch();

  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleBrandSelection = (brand) => {
    const index = selectedBrands.indexOf(brand);
    if (index > -1) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
    dispatch(filterProductsByBrand(selectedBrands));
  };

  const filterProducts = () => {
    dispatch(filterProductsByBrand(selectedBrands));
  };

  return (
    <div className="w-1/5 bg-gray-100">
      <div className="bg-white border-b-2 border-gray-200 py-4 px-6">
        <h1 className="text-xl font-medium mb-2">Filtros</h1>
        <hr className="border-gray-200" />
      </div>
      <div className="p-6">
        <h2 className="text-lg font-medium mb-4">Marcas</h2>
        <ul className="space-y-2">
          {allBrands?.map(({ name, id }) => (
            <li key={id}>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleBrandSelection(name)}
                />
                <span className="ml-2">{name}</span>
              </label>
            </li>
          ))}
        </ul>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={filterProducts}
        >
          Filtrar productos
        </button>
      </div>
    </div>
  );
}
