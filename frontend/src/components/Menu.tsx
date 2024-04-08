// Menu.tsx
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

interface MenuProps {
  handleLogOut: () => void;
  closeMenu: () => void; // Add closeMenu prop
}

const Menu: React.FC<MenuProps> = ({ handleLogOut, closeMenu }) => {
  const { user } = useContext(UserContext);


  const handleClick = () => {
    closeMenu(); // Call closeMenu function when a link is clicked
  };

  return (
    <div className="absolute top-8 right-0 md:top-10 overflow-hidden bg-slate-900  rounded-md shadow-md text-slate-200  justify-start items-start w-40 md:w-48">
      <ul className="flex flex-col">
        {user ? (
          <div>
            <h3 className="border border-gray-800 p-2 text-sm">
              <Link to="/" onClick={handleClick}>
                Dashboard
              </Link>
            </h3>
            <h3 className="border border-gray-800 p-2 text-sm">
              <Link to={user ?`/profile/${user?._id}`:"/login"} onClick={handleClick}>
                Profile
              </Link>
            </h3>
            <h3 className="border border-gray-800 p-2 text-sm md:hidden">
              <Link to="/write" onClick={handleClick}>
                Write
              </Link>
            </h3>
            <h3 className="border border-gray-800 p-2 text-sm">
              <Link to="/my-blog" onClick={handleClick}>
                My Blog
              </Link>
            </h3>
            <h3
              onClick={() => {
                handleLogOut();
                handleClick();
              }}
              className="border border-gray-800 p-2 text-sm"
            >
              Logout
            </h3>
          </div>
        ) : (
          <div>
            <h3 className="border border-gray-800 p-2">
              <Link to="/login" onClick={handleClick}>
                Login
              </Link>
            </h3>
            <h3 className="border border-gray-800 p-2">
              <Link to="/register" onClick={handleClick}>
                Register
              </Link>
            </h3>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Menu;
