import { Link } from "react-router-dom";
import SearchOrder from "../feature/order/SearchOrder";
import UserName from "./UserName";
function Header() {
  return (
    <header className="flex items-center justify-between border-b-[2px] border-stone-300 bg-yellow-500 px-3 pb-2 pt-4 uppercase tracking-widest">
      <Link to="/">Fast React Pizza Co.</Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
