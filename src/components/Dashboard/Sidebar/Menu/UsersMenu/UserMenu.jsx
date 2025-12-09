import React from "react";
import MenuItem from "../MenuItem";
import { FaRegAddressBook } from "react-icons/fa";
import { PiBookOpenTextBold } from "react-icons/pi";
import { MdDashboardCustomize } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";

const UserMenu = ({ handleToggle }) => {
  return (
    <div>
      <MenuItem
        label={"Dashboard"}
        address={"/dashboard"}
        icon={MdDashboardCustomize}
        handleToggle={handleToggle}
      />
      <MenuItem
        label={"Add Lesson"}
        address={"/dashboard/add-lesson"}
        icon={FaRegAddressBook}
        handleToggle={handleToggle}
      />
      <MenuItem
        label={"My Lessons"}
        address={"/dashboard/my-lesson"}
        icon={PiBookOpenTextBold}
        handleToggle={handleToggle}
      />
      <MenuItem
        label={"My Favorites"}
        address={"/dashboard/my-favorites"}
        icon={GrFavorite}
        handleToggle={handleToggle}
      />
    </div>
  );
};

export default UserMenu;
