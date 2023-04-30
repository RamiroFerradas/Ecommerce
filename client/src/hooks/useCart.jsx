import { useSelector, useDispatch } from "react-redux";
import { addItem, clearCart, removeItem } from "../redux/cartSlice";

export const useCart = (product) => {
  const dispatch = useDispatch();
  const { items } = useSelector(({ cart }) => cart);

  const itemExists = items.find((item) => item.id === product.id);

  const handleAddToCart = (product) => {
    if (!itemExists) {
      dispatch(addItem(product));
    }
  };

  const handleRemoveFromCart = (product) => {
    if (itemExists) {
      dispatch(removeItem(product.id));
    }
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return {
    items,
    itemExists,
    handleAddToCart,
    handleRemoveFromCart,
    handleClearCart,
  };
};
