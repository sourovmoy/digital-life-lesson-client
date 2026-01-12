import { useState } from "react";
import { Link, useNavigate } from "react-router";
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
import ThemeToggle from "../../Shared/ThemeToggle/ThemeToggle";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { logOut, loading } = useAuth();
  const { role, roleLoading } = useRole();
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  if (loading || roleLoading) return <LoadingSpinner />;

  return (
    <>
      {/* Small Screen Navbar, only visible till md breakpoint */}
      <div className="bg-base-200 text-base-content flex justify-between items-center md:hidden border-b border-base-300 px-3 sm:px-4">
        <div>
          <div className="block cursor-pointer font-bold">
            <Link to="/">
              <img className="h-16 w-16 sm:h-20 sm:w-20" src={logo} alt="logo" />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-3 sm:p-4 focus:outline-none focus:bg-secondary/20 hover:bg-secondary/10 transition-colors rounded-lg"
        >
          <AiOutlineBars className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        
        {/* Mobile Theme Toggle in Header */}
        <div className="p-3 sm:p-4">
          <ThemeToggle size="small" />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`z-50 md:fixed flex flex-col justify-between overflow-x-hidden bg-base-200 border-r border-base-300 w-64 lg:w-72 space-y-4 sm:space-y-6 px-2 sm:px-3 py-3 sm:py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out shadow-lg md:shadow-none`}
      >
        <div className="flex flex-col h-full">
          {/* Top Content */}
          <div>
            {/* Logo */}
            <div className="hidden md:flex justify-start ml-3 lg:ml-5 items-center mx-auto">
              <Link to="/">
                <img className="h-16 w-16 lg:h-20 lg:w-20" src={logo} alt="logo" />
              </Link>
            </div>
          </div>

          {/* Middle Content */}
          <div className="flex flex-col justify-between flex-1 mt-4 sm:mt-6">
            {/*  Menu Items */}
            <nav className="space-y-1">
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
          <div className="mt-auto">
            {/* Theme Toggle for Desktop Sidebar */}
            <div className="hidden md:flex justify-center mb-3 sm:mb-4">
              <ThemeToggle size="normal" />
            </div>
            
            <hr className="border-base-300 mb-3 sm:mb-4" />
            <button
              onClick={handleLogout}
              className="flex cursor-pointer w-full items-center px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-base-content/70 hover:bg-secondary/20 hover:text-primary transition-colors duration-300 transform rounded-lg min-h-[44px]"
            >
              <GrLogout className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="mx-3 sm:mx-4 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
