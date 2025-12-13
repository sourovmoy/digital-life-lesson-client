import React from "react";
import { FaUsers } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";
import { MdDashboardCustomize } from "react-icons/md";
import { PiBookOpenTextBold } from "react-icons/pi";
import MenuItem from "../Menu/MenuItem";
import { TbMessageReportFilled } from "react-icons/tb";

const AdminMenu = ({ handleToggle }) => {
  return (
    <div>
      <MenuItem
        label={"Dashboard"}
        address={"/dashboard/admin"}
        icon={MdDashboardCustomize}
        handleToggle={handleToggle}
      />
      <MenuItem
        label={"Manage users"}
        address={"/dashboard/admin/manage-users"}
        icon={FaUsers}
        handleToggle={handleToggle}
      />
      <MenuItem
        label={"Manage Lessons"}
        address={"/dashboard/admin/manage-lessons"}
        icon={PiBookOpenTextBold}
        handleToggle={handleToggle}
      />
      <MenuItem
        label={"Reported Lessons"}
        address={"/dashboard/admin/reported-lessons"}
        icon={TbMessageReportFilled}
        handleToggle={handleToggle}
      />
      <MenuItem
        icon={FcSettings}
        label="Profile"
        address="/dashboard/admin/profile"
        handleToggle={handleToggle}
      />
    </div>
  );
};

export default AdminMenu;
