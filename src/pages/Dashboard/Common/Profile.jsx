import useAuth from "../../../hooks/useAuth";
import coverImg from "../../../assets/images/cover.jpg";
import useRole from "../../../hooks/useRole";
import { ImSpinner10 } from "react-icons/im";
import { GoStarFill } from "react-icons/go";

const Profile = () => {
  const { user } = useAuth();
  const { role, isPremium, roleLoading } = useRole();

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8">
      <div className="bg-white shadow-lg rounded-2xl w-full sm:w-4/5 lg:w-3/5">
        {/* Cover Image */}
        <img
          alt="cover photo"
          src={coverImg}
          className="w-full mb-4 rounded-t-lg h-40 sm:h-56 object-cover"
        />

        {/* Profile Content */}
        <div className="flex flex-col items-center justify-center p-4 -mt-14 sm:-mt-16">
          {/* Profile Picture */}
          <div className="relative">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-20 w-20 sm:h-24 sm:w-24 border-4 border-white"
            />
            <span className="absolute -top-3 left-12">
              {isPremium && <p className="text-4xl">⭐</p>}
            </span>
          </div>

          <p className="p-2 px-4 text-xs text-white bg-lime-600 rounded-full mt-2">
            {roleLoading ? <ImSpinner10 className="animate-spin" /> : role}
          </p>

          <p className="mt-2 text-lg sm:text-xl font-medium text-gray-800">
            User Id: {user?.uid}
          </p>

          {/* Info + Buttons Section */}
          <div className="w-full p-4 mt-4 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:justify-between text-sm text-gray-600">
              {/* Name */}
              <p className="flex flex-col w-full sm:w-[45%]">
                Name
                <span className="font-bold text-gray-700">
                  {user?.displayName}
                </span>
              </p>

              {/* Email */}
              <p className="flex flex-col w-full sm:w-[45%]">
                Email
                <span className="font-bold text-gray-700">{user?.email}</span>
              </p>

              {/* Buttons */}
              <div className="flex flex-col w-full sm:w-auto gap-2 mt-2 sm:mt-0">
                <button className="bg-lime-500 px-6 py-2 rounded-lg text-white cursor-pointer hover:bg-lime-700 transition">
                  Update Profile
                </button>
                <button className="bg-lime-500 px-6 py-2 rounded-lg text-white cursor-pointer hover:bg-lime-700 transition">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
