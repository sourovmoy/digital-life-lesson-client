/* eslint-disable no-unused-vars */
import { NavLink } from "react-router";

const MenuItem = ({ label, address, icon: Icon, handleToggle }) => {
  return (
    <NavLink
      to={address}
      end
      onClick={handleToggle}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-2 transition-colors duration-300 transform rounded-lg hover:bg-secondary/20 hover:text-primary ${
          isActive ? "bg-primary/10 text-primary border-l-4 border-primary" : "text-base-content/70"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};

export default MenuItem;
