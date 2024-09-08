import { useNavigate, useRouteError } from "react-router-dom";
import Button from "./Button";

function NotFound() {
  const navigate = useNavigate();
  const Error = useRouteError();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <h1 className="text-4xl font-bold">Something went wrong 😢</h1>
      <p className="text-2xl font-bold text-red-600">
        {Error.data || "Unknown Error please contact admin"}
      </p>
      <Button type="primary" to="/">
        &larr; Go back
      </Button>
    </div>
  );
}

export default NotFound;
