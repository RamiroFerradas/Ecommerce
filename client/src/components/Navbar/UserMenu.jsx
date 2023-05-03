import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserMenu({ setShowMenu }) {
  const { logout } = useAuth0();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  let buttonText = pathname !== "/admin" ? "Panel de administración" : "Inicio";

  return (
    <div
      id="userMenu"
      className="hidden md:right-12  transform-translate-x-1/2 mt-2 py-2 w-48 z-50  absolute right-0 top-14 bg-white shadow-lg rounded-lg"
    >
      <button
        className="block px-4 py-2 text-gray-800 hover:bg-blue-600/75 hover:text-white w-full transition duration-10 ease-in-out"
        onClick={() => {
          setShowMenu(false);
          navigate(pathname !== "/admin" ? "/admin" : "/");
        }}
      >
        {buttonText}
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
