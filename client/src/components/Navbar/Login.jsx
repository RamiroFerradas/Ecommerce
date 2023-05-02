import { useAuth0 } from "@auth0/auth0-react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserMenu from "../Navbar/UserMenu.jsx";

export default function Login() {
  const { isLoading, isAuthenticated, loginWithRedirect, user } = useAuth0();

  const toggleUserMenu = (event) => {
    event.stopPropagation();
    const userMenu = document.querySelector("#userMenu");
    userMenu.classList.toggle("hidden");
  };

  return (
    <div className="flex justify-center items-center">
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
          <div className="flex flex-col items-center relatie overflow-hidden ">
            <button onClick={toggleUserMenu}>
              <img
                src={user?.picture}
                alt={user?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            </button>
            <div className="text-gray-800 text-sm absolute top-11">
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative inline-block w-10 h-10"></div>
      )}
    </div>
  );
}
