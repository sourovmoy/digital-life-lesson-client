import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import coverImg from "../../../assets/images/cover.jpg";
import { ImSpinner } from "react-icons/im";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile, setUser, loading: ld } = useAuth();
  const { role, isPremium, roleLoading } = useRole();
  const [loading, setLoading] = useState(false);
  const modalRef = useRef();
  const handelUpdate = () => {
    modalRef.current.showModal();
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: user?.displayName,
      photoURL: user?.photoURL,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const image = data.photo[0];
    const formData = new FormData();
    formData.append("image", image);

    const uri = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGEBB_API
    }`;
    axios.post(uri, formData).then((res) => {
      const photoURL = res.data.data.display_url || user?.photoURL;
      const userData = {
        displayName: data.displayName,
        photoURL: photoURL,
      };

      axiosSecure.patch("/users", userData).then(() => {});
      setLoading(false);

      updateUserProfile(data.displayName, photoURL).then(() => {
        modalRef.current.close();
        reset();
        toast.success("Successfully Update an account");
        setUser({
          ...user,
          displayName: data.displayName,
          photoURL: photoURL,
        });
      });
    });
  };

  if (ld) return <LoadingSpinner />;

  return (
    <div>
      {" "}
      <div>
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
                <span className="top-5">
                  {isPremium && (
                    <div className="badge badge-warning">⭐ Premium</div>
                  )}
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
                    <span className="font-bold text-gray-700">
                      {user?.email}
                    </span>
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col w-full sm:w-auto gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => handelUpdate()}
                      className="bg-lime-500 px-6 py-2 rounded-lg text-white cursor-pointer hover:bg-lime-700 transition"
                    >
                      Update Profile
                    </button>
                    {/* Modal */}
                    <dialog ref={modalRef} className="modal">
                      <div className="modal-box w-11/12 max-w-lg">
                        <h2 className="text-2xl font-bold mb-4 text-center">
                          Update Profile
                        </h2>

                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="space-y-4"
                        >
                          {/* Display Name */}
                          <div>
                            <label className="font-medium">Display Name</label>
                            <input
                              type="text"
                              placeholder="Enter new name"
                              {...register("displayName", {
                                required: "Name is required",
                              })}
                              className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            {errors.displayName && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.displayName.message}
                              </p>
                            )}
                          </div>

                          {/* Photo Upload */}
                          <div>
                            <label
                              htmlFor="photo"
                              className="block mb-2 text-sm font-medium text-gray-700"
                            >
                              Profile Image
                            </label>

                            <input
                              id="photo"
                              type="file"
                              accept="image/*"
                              {...register("photo", {
                                required: "Photo is required",
                              })}
                              className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-lime-50 file:text-lime-700
          hover:file:bg-lime-100
          bg-gray-100 border border-dashed border-lime-300 rounded-md cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400
          py-2"
                            />

                            {errors.photo && (
                              <p className="text-red-600 text-sm">
                                {errors.photo.message}
                              </p>
                            )}
                          </div>

                          {/* Submit */}
                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
                          >
                            {loading ? (
                              <div className="flex justify-center">
                                <ImSpinner className="animate-spin" />
                              </div>
                            ) : (
                              "Update Profile"
                            )}
                          </button>
                        </form>

                        {/* Close Button */}
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
