import { useState } from "react";
import UserRoleModal from "../Modal/UserRoleModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UserDataRow = ({ user, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  const axios = useAxiosSecure();

  const closeModal = () => setIsOpen(false);
  const handelRoleUpdate = async (newRole) => {
    const update = { role: newRole };
    Swal.fire({
      title: "Are you sure?",
      text: `You want to make ${user.displayName} as ${newRole}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`/user/${user?._id}`, update).then((res) => {
          if (res.data.result.modifiedCount) {
            Swal.fire({
              title: `${user.displayName} is ${newRole} from now!`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-base-300 bg-base-100 text-sm">
        <img
          className="h-15 w-15 rounded-2xl outline-3"
          src={user?.photoURL}
          alt={user?.displayName}
        />
      </td>
      <td className="px-5 py-5 border-b border-base-300 bg-base-100 text-sm">
        <p className="text-base-content">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-base-300 bg-base-100 text-sm">
        <p className="text-base-content">{user?.role}</p>
      </td>
      <td className="px-5 py-5 border-b border-base-300 bg-base-100 text-sm">
        <p className="text-base-content">
          {user?.isPremium === true ? "Premium" : "Not Premium"}
        </p>
      </td>

      <td className="px-5 py-5 border-b border-base-300 bg-base-100 text-sm">
        <span
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Role</span>
        </span>
        {/* Modal */}
        <UserRoleModal
          isOpen={isOpen}
          closeModal={closeModal}
          role={user?.role}
          onUpdateRole={handelRoleUpdate}
        />
      </td>
    </tr>
  );
};

export default UserDataRow;
