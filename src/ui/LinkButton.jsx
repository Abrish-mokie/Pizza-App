import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className =
    "text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-2";

  if (to === "-1") {
    return <button onClick={() => navigate(-1)}>{children}</button>;
  }

  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}

export default LinkButton;
