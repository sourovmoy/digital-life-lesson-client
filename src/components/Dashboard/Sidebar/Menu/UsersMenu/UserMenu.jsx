import React from "react";
import MenuItem from "../MenuItem";
import { FaRegAddressBook } from "react-icons/fa";
import { PiBookOpenTextBold } from "react-icons/pi";

const UserMenu = ({ handleToggle }) => {
  return (
    <div>
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
    </div>
  );
};

export default UserMenu;
