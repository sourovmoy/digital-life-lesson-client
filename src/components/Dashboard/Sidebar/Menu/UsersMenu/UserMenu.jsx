import React from "react";
import MenuItem from "../MenuItem";
import { FaRegAddressBook } from "react-icons/fa";
import { PiBookOpenTextBold } from "react-icons/pi";

const UserMenu = ({ isActive }) => {
  return (
    <div>
      <MenuItem
        label={"Add Lesson"}
        address={"/dashboard/add-lesson"}
        icon={FaRegAddressBook}
        className={isActive}
      />
      <MenuItem
        label={"My Lessons"}
        address={"/dashboard/my-lesson"}
        icon={PiBookOpenTextBold}
      />
    </div>
  );
};

export default UserMenu;
