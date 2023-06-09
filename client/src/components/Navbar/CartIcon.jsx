import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function CartIcon({ setShowCartMenu, showCartMenu }) {
  const { items } = useSelector(({ cart }) => cart);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        const userMenu = document.getElementById("userMenu");
        if (userMenu) {
          userMenu.classList?.add("hidden");
        }
        setShowCartMenu(!showCartMenu);
      }}
      className="relative inline-block mt-1 cursor-pointer mr-5"
    >
      <FontAwesomeIcon className="text-2xl" icon={faShoppingCart} />
      <span className="absolute top-3 right-3 bg-red-600 text-white font-bold text-xs rounded-full px-1 py-0.3">
        {items.length}
      </span>
    </div>
  );
}
