import useFetchBrands from "../../hooks/useFetchBrands";

export default function Sidebar() {
  const { allBrands } = useFetchBrands();
  return (
    <div className="w-1/5 h-screen bg-gray-100">
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
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">{name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
