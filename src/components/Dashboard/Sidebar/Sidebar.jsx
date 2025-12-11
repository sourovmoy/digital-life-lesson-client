import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/images/logo.png";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import MenuItem from "./Menu/MenuItem";
import UserMenu from "./Menu/UsersMenu/UserMenu";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import AdminMenu from "./AdminMenu/AdminMenu";

const Sidebar = () => {
  const { logOut, loading } = useAuth();
  const { role, roleLoading } = useRole();
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };
  if (loading || roleLoading) return <LoadingSpinner />;

  return (
    <>
      {/* Small Screen Navbar, only visible till md breakpoint */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer font-bold">
            <Link to="/">
              <img className="h-20 w-20" src={logo} alt="logo" />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Top Content */}
          <div>
            {/* Logo */}
            <div className="hidden md:flex  justify-start ml-5 items-center mx-auto">
              <Link to="/">
                <img className="h-20 w-20" src={logo} alt="logo" />
              </Link>
            </div>
          </div>

          {/* Middle Content */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/*  Menu Items */}
            <nav>
              <MenuItem
                icon={FaHome}
                label="Home"
                address="/"
                handleToggle={handleToggle}
              />
              {/* Common Menu */}
              {role === "user" && <UserMenu handleToggle={handleToggle} />}
              {role === "admin" && <AdminMenu handleToggle={handleToggle} />}

              {/* Role-Based Menu */}
            </nav>
          </div>

          {/* Bottom Content */}
          <div>
            <hr />
            <button
              onClick={logOut}
              className="flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
            >
              <GrLogout className="w-5 h-5" />

              <span className="mx-4 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
