import { useAuth0 } from "@auth0/auth0-react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function Login() {
  const { isLoading, isAuthenticated, loginWithRedirect, logout, user } =
    useAuth0();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      {!isAuthenticated && !isLoading && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => loginWithRedirect()}
        >
          Ingresar
        </button>
      )}

      {isAuthenticated && user ? (
        <div className="relative inline-block">
          <div className="flex flex-col items-center relatie overflow-hidden h-10">
            <button onClick={() => setShowMenu(!showMenu)}>
              <img
                src={user?.picture}
                alt={user?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            </button>
            <div className="text-gray-800 text-sm absolute top-9">
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </div>

          {showMenu && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-10">
              <button
                className="block px-4 py-2 text-gray-800 hover:bg-blue-600/75 hover:text-white w-full transition duration-10 ease-in-out"
                onClick={() => console.log("Ir al panel de administración")}
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
          )}
        </div>
      ) : (
        <div className="relative inline-block w-10 h-10"></div>
      )}
    </div>
  );
}
