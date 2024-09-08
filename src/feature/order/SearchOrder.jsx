import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  // console.log(query);
  return (
    <form
      onSubmit={handleSubmit}
      className="order-last mt-3 flex flex-row items-center justify-center space-x-5"
    >
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-24 rounded-full bg-yellow-200 px-3 py-2 transition-all duration-300 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-50 sm:w-64 sm:px-6 sm:py-3 sm:focus:w-72"
      />
      <button className="rounded-full border border-stone-300 bg-yellow-300 px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 sm:px-6 sm:py-3">
        Submit
      </button>
    </form>
  );
}

export default SearchOrder;
