import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deleteProduct } from "../../../../redux/productsSlice";

export default function Card({
  product,
  setViewFormProducts,
  setProductEditSelected,
  viewToast,
}) {
  const dispatch = useDispatch();
  const handleEditProduct = (product) => {
    setViewFormProducts(true);
    setProductEditSelected(product);
  };

  const handleDeleteProduct = (product) => {
    Swal.fire({
      title: "Eliminar producto",
      text: `Desea eliminar el producto ${product.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "##3B82F6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(product.id));
        viewToast(`Producto eliminado`);
      }
    });
  };
  return (
    <li
      key={product.id}
      className="bg-white shadow rounded-lg p-4  w-full md:w-40 h-72 border border-gray-300 flex flex-col justify-around items-center"
    >
      <div>
        <div className="h-10 overflow-hidden">
          <p className="text-sm font-bold text-center">{product.name}</p>
        </div>

        <div className="flex justify-center ">
          <img
            className="object-contain h-28"
            src={product.image_url}
            alt={product.brand.name}
          />
        </div>
        <p className="text-sm text-center">{product.brand.name}</p>
        <p className="mt-2 text-gray-600 text-center">${product.price}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-sm"
          onClick={(e) => {
            e.stopPropagation();
            handleEditProduct(product);
          }}
        >
          Editar
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded text-sm"
          onClick={() => handleDeleteProduct(product)}
        >
          Borrar
        </button>
      </div>
    </li>
  );
}
