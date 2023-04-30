import React from "react";

const ProductModal = ({ product, setSelectedProduct }) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  const handleModalClose = () => {
    setSelectedProduct(null);
  };
  return (
    <div onClick={handleModalClose}>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none h-screen">
        <div
          className="relative w-auto my-6 mx-auto max-w-3xl"
          onClick={stopPropagation}
        >
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white p outline-none focus:outline-none justify-center items-center sm:h-[65vh] md:h-[90vh] overflow-hidden">
            <button
              className="p-1 ml-auto bg-transparent border-0 text-gray-600 float-right text-3xl leading-none font-semibold outline-none focus:outline-none opacity-70"
              onClick={handleModalClose}
            >
              <span className="bg-transparent text-black opacity-70 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>

            <div className="flex p-3 h-[28rem]">
              <div className="w-1/2 relative justify-center items-center flex ">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="object-cover h-80"
                />
              </div>
              <div className="w-1/2 p-4 bg-gray-100 border-gray-300 border rounded-md">
                <p className="text-2xl font-semibold mb-4">{product.name}</p>
                <p className="text-md mb-5">Marca: {product.brand.name}</p>
                <p className="text-xl font-semibold mb-1">Descripción</p>

                <p className="text-slate-500 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-10 p-6 border-t border-solid border-slate-200 ">
              <p className="text-3xl font-extralight">${product.price}</p>
              <button className="bg-gray-800 text-white px-3 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black h-screen"></div>
    </div>
  );
};

export default ProductModal;
