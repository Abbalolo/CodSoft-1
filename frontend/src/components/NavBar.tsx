// NavBar.tsx
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { url } from "../ApiUrl";

function NavBar() {
  const [toggle, setToggle] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const param = useLocation().pathname;
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogOut = async () => {
    try {
      await axios.get(`${url}/api/v1/auth/logout`);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const closeMenu = () => {
    setToggle(false); // Function to close the menu
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setToggle(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center px-6 md:px-[150px] py-4">
      <Link to="/" className="font-extrabold lg:text-xl text-lg">
        CodSoft
      </Link>
      {param === "/" && <SearchBar />}
      <div className=" items-center gap-3   md:flex">
        <div className=" items-center  hidden md:flex">
          {user ? (
            <h3>
              <Link onClick={() => setToggle(false)} to="/write">
                Write
              </Link>
            </h3>
          ) : (
            <div className="flex items-center gap-3">
              <h3 className="">
                <Link to="/login">Login</Link>
              </h3>
              <h3 className="">
                <Link to="/register">Register</Link>
              </h3>
            </div>
          )}
        </div>
        <div className="relative" ref={menuRef}>
          <button className="" onClick={() => setToggle(!toggle)}>
            <HiMenuAlt3 className="text-[20px]" />
          </button>
          {toggle ? (
            <Menu handleLogOut={handleLogOut} closeMenu={closeMenu} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
