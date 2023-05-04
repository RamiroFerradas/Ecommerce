import CartIcon from "./CartIcon";
import useSearch from "../../hooks/useSearch";
import Login from "./Login";
import logoSD from "../../assets/images/logo.jpeg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import CartMenu from "./CartMenu";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showCartMenu, setShowCartMenu] = useState(false);

  const openSidebar = () => {
    const sidebar = document.getElementById("sidebar_menu");
    if (sidebar) {
      sidebar?.classList?.toggle("hidden");
    }
  };

  const { handleInputChangue, input } = useSearch();
  return (
    <nav
      className="bg-blue-200 border-gray-200 items-center mx-auto p-4 md:justify-around md:order-1 flex md:gap-16 flex-wrap md:flex-nowrap justify-around"
      onClick={() => setShowCartMenu(false)}
    >
      <NavLink to="/" className="flex items-center order 1">
        <img src={logoSD} className="h-8 mr-3" alt="StoryDots Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Storydots
        </span>
      </NavLink>

      <div className="flex gap-3 mt-3 order-3">
        <button
          onClick={openSidebar}
          className="px-3 h-10 w-10 text-center bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md md:hidden"
        >
          <FontAwesomeIcon icon={faFilter} className="text-center" />
        </button>
        <div className="relative md:hidden xs:block w-72 md:w-[35rem]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
          <input
            type="text"
            id="search-navbar"
            value={input}
            onChange={handleInputChangue}
            className="text-center block w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar..."
          />
        </div>
      </div>
      <div className="md:order-3 flex items-center justify-around flex-row  h-12 w-auto gap-1 order-2">
        <CartIcon
          showCartMenu={showCartMenu}
          setShowCartMenu={setShowCartMenu}
        />
        <Login setShowMenu={setShowMenu} showMenu={showMenu} />
      </div>

      <UserMenu setShowMenu={setShowMenu} />
      <CartMenu showCartMenu={showCartMenu} setShowCartMenu={setShowCartMenu} />
    </nav>
  );
}
