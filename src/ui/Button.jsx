import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "transition-color forcus:outline-none focus: disabled:cursor-not-allowed disabled:grayscale disabled:opacity-100 inline-block rounded-full bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800 ring-offset-2 duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 ";
  const styles = {
    primary: base + "sm:px-6 sm:py-4 px-4 py-3 text-sm",
    small: base + "py-2 px-4 text-xs md:px-5 md:py-2.5",
    round: base + "py-1 px-2.5 text-sm md:px-3.5 md:py-2",
    secondary:
      "transition-all text-sm border-2 forcus:outline-none focus: disabled:cursor-not-allowed disabled:grayscale disabled:opacity-100 inline-block  rounded-full font-semibold uppercase tracking-wide text-stone-800 ring-offset-2 duration-300 hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-200 sm:px-5.5 sm:py-3.5 px-3.5 py-2.5 ",
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={styles[type]} disabled={disabled}>
        {children}
      </button>
    );
  }

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
