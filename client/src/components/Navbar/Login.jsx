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
            <button onClick={toggleUserMenu}>
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

          <UserMenu />
        </div>
      ) : (
        <div className="relative inline-block w-10 h-10"></div>
      )}
    </div>
  );
}
