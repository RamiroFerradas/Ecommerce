import { useSelector, useDispatch } from "react-redux";
import { addItem, clearCart, removeItem } from "../redux/cartSlice";

export const useCart = (product) => {
  const dispatch = useDispatch();
  const { items } = useSelector(({ cart }) => cart);

  const itemExist = items.find((item) => item.id === product?.id);
  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeItem(product?.id));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPriceCart = items
    ?.reduce(
      (accumulator, currentValue) =>
        accumulator + parseFloat(currentValue.price),
      0
    )
    .toFixed(2);

  return {
    items,
    itemExist,
    handleAddToCart,
    handleRemoveFromCart,
    handleClearCart,
    totalPriceCart,
  };
};
