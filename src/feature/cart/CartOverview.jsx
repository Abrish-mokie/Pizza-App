import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import { useSelector } from "react-redux"; // Import the hook to access Redux store state.
import { getTotalCartQuantity, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (totalCartQuantity === 0) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span className="">{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <LinkButton to="/cart">Open cart &rarr;</LinkButton>
    </div>
  );
}

export default CartOverview;
