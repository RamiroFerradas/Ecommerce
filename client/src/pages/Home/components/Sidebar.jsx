import { useDispatch } from "react-redux";
import useFetchBrands from "../../../hooks/useFetchBrands";
import { useState } from "react";
import {
  filterProductsByBrand,
  sortProducts,
} from "../../../redux/productsSlice";

export default function Sidebar() {
  const { allBrands } = useFetchBrands();
  const dispatch = useDispatch();

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [orderType, setOrderType] = useState({
    price: "",
    alphabetically: "",
  });

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
    dispatch(sortProducts(orderType));
  };

  return (
    <div className="w-1/5 bg-gray-100">
      <div className="bg-white border-b-2 border-gray-200 py-4 px-6">
        <h1 className="text-xl font-medium ">Filtrar</h1>
        <hr className="border-gray-200" />
      </div>
      <div className="px-6 py-2">
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
      </div>
      <div className="bg-white border-b-2 border-gray-200 py-4 px-6">
        <h1 className="text-xl font-medium mb-">Ordenar</h1>
        <hr className="border-gray-200" />
      </div>
      <div className="px-6 py-2">
        <h2 className="text-md font-medium mb-4">Alfabeticamente</h2>
        <div className="space-y-2 flex flex-col">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              value="a-z"
              checked={orderType.alphabetically === "a-z"}
              onChange={(e) =>
                setOrderType({
                  ...orderType,
                  alphabetically: e.target.checked ? "a-z" : "",
                })
              }
            />
            <span className="ml-2">A-Z</span>

            <input
              type="checkbox"
              className="form-checkbox"
              value="z-a"
              checked={orderType.alphabetically === "z-a"}
              onChange={(e) =>
                setOrderType({
                  ...orderType,
                  alphabetically: e.target.checked ? "z-a" : "",
                })
              }
            />
            <span className="ml-2">Z-A</span>
          </label>
        </div>
      </div>
      <div className="px-6 py-2">
        <h2 className="text-md font-medium mb-4">Precio</h2>
        <div className="space-y-2 flex flex-col">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              value="high"
              checked={orderType.price === "high"}
              onChange={(e) =>
                setOrderType({
                  ...orderType,
                  price: e.target.checked ? "high" : "",
                })
              }
            />
            <span className="ml-2">Mayor</span>

            <input
              type="checkbox"
              className="form-checkbox"
              value="low"
              checked={orderType.price === "low"}
              onChange={(e) =>
                setOrderType({
                  ...orderType,
                  price: e.target.checked ? "low" : "",
                })
              }
            />
            <span className="ml-2">Menor</span>
          </label>
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-6"
        onClick={filterProducts}
      >
        Aplicar
      </button>
    </div>
  );
}
