import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserMenu() {
  const { logout } = useAuth0();

  const navigate = useNavigate();

  return (
    <div
      id="userMenu"
      className="absolute left-1/2 transform -translate-x-1/2 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-10 hidden"
    >
      <button
        className="block px-4 py-2 text-gray-800 hover:bg-blue-600/75 hover:text-white w-full transition duration-10 ease-in-out"
        onClick={() => navigate(`/admin`)}
      >
        Panel de administración
      </button>
      <button
        className="block px-4 py-2 text-gray-800 hover:bg-blue-600/75 hover:text-white w-full border-t border-gray-500 transition duration-10 ease-in-out"
        onClick={() => logout()}
      >
        Salir
      </button>
    </div>
  );
}
