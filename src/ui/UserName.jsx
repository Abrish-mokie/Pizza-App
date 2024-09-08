import { useSelector } from "react-redux";

function UserName() {
  const username = useSelector((state) => state.user.username);

  if (username === "") {
    return null;
  }

  return (
    <div className="hidden md:block">
      <p className="md:text-md text-sm font-semibold">Welcome, {username}</p>
    </div>
  );
}

export default UserName;
