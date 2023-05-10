import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/usersSlice";

export default function FormUsers({ user, handleClose }) {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    ...user,
  });

  const handleChangue = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleChangueName = (e) => {
    const { name, value } = e.target;

    // Verificar si se ingresaron más de dos palabras
    const wordCount = value.trim().split(/\s+/).length;
    if (wordCount > 2) {
      return;
    }

    setUserData({
      ...userData,
      [name]: value,
      // Actualizar given_name y family_name según el nuevo valor de name
      given_name: value.split(" ")[0] || "",
      family_name: value.split(" ")[1] || "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUser(userData));
    handleClose();
  };
  return (
    <div
      onClick={handleClose}
      className="z-50 fixed inset-0 w-screen h-screen bg-black/50 backdrop-blur-xs"
    >
      <form
        onSubmit={handleSubmit}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8"
      >
        <div onClick={(e) => e.stopPropagation()}>
          <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChangueName}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block font-medium mb-2 border-gray-400 rounded-lg border px-4 py-2 text-gray-600"
            >
              {userData.email}
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="isVisible" className="block font-medium mb-2">
              ¿Es visible?
            </label>
            <select
              id="isVisible"
              name="isVisible"
              value={userData.isVisible}
              onChange={handleChangue}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg"
            >
              <option value={true}>Sí</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block font-medium mb-2">
              Rol
            </label>
            <select
              id="role"
              name="role"
              value={userData.role}
              onChange={handleChangue}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg"
            >
              <option value="administrador">Administrador</option>
              <option value="usuario">Usuario</option>
              <option value="invitado">Invitado</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
