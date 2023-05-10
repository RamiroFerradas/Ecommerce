import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthUsers from "../../hooks/useAuthUsers";

export default function Login() {
  const { isLoading, isAuthenticated, loginWithRedirect, userDb, allUsers } =
    useAuthUsers();

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

      {isAuthenticated && userDb && (
        <div className="relative inline-block w-14 h-14">
          <div className="flex flex-col items-center relatie overflow-hidden ">
            <button onClick={toggleUserMenu}>
              <img
                src={userDb?.picture}
                alt={userDb?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            </button>
            <div className="text-gray-800 text-sm absolute top-11">
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
