import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import success from "../../assets/successfully.json";

const AddLesson = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { isPremium } = useRole();
  const axios = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const {
      accessLevel,
      category,
      visibility,
      title,
      emotionalTone,
      description,
    } = data;
    const createLessons = {
      title,
      description,
      category,
      emotionalTone,
      visibility,
      accessLevel,
      createdAt: new Date(),
      likes: [],
      favorites: [],
      comments: [],
      reports: [],
      creator: {
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      },
    };
    await axios.post("/lessons", createLessons).then((res) => {
      if (res.data.result.acknowledged) {
        toast.success("Lesson Created");
        reset();
        setShowSuccess(true);

        // Hide animation after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      }
    });
  };

  return (
    <div className="shadow-md p-6 rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6">
        Create a New Lesson
      </h2>
      {showSuccess && (
        <div className="absolute inset-0 bg-white/90 flex items-center justify-center rounded-xl z-50">
          <Lottie animationData={success} loop={false} className="w-64" />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* TITLE */}
        <div>
          <label className="font-semibold">Lesson Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 mt-1 border rounded"
            placeholder="Enter lesson title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="font-semibold">Full Description / Story</label>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 20,
                message: "Minimum 20 characters required",
              },
            })}
            className="w-full p-2 mt-1 border rounded h-32"
            placeholder="Write your lesson, story or realization..."
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* CATEGORY */}
        <div>
          <label className="font-semibold">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full p-2 mt-1 border rounded"
          >
            <option value="">Select Category</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Career">Career</option>
            <option value="Relationships">Relationships</option>
            <option value="Mindset">Mindset</option>
            <option value="Mistakes Learned">Mistakes Learned</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* EMOTIONAL TONE */}
        <div>
          <label className="font-semibold">Emotional Tone</label>
          <select
            {...register("emotionalTone", {
              required: "Emotional tone is required",
            })}
            className="w-full p-2 mt-1 border rounded"
          >
            <option value="">Select Emotional Tone</option>
            <option value="Motivational">Motivational</option>
            <option value="Sad">Sad</option>
            <option value="Realization">Realization</option>
            <option value="Gratitude">Gratitude</option>
          </select>
          {errors.emotionalTone && (
            <p className="text-red-500 text-sm">
              {errors.emotionalTone.message}
            </p>
          )}
        </div>

        {/* PRIVACY */}
        <div>
          <label className="font-semibold">Privacy</label>
          <select
            {...register("visibility", {
              required: "Privacy selection is required",
            })}
            className="w-full p-2 mt-1 border rounded"
          >
            <option value="">Select Privacy</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          {errors.visibility && (
            <p className="text-red-500 text-sm">{errors.visibility.message}</p>
          )}
        </div>

        {/* ACCESS LEVEL */}
        <div>
          <label className="font-semibold">Access Level</label>

          <select
            {...register("accessLevel", {
              required: "Access level is required",
            })}
            className={`w-full p-2 mt-1 border rounded ${
              !isPremium ? "cursor-not-allowed opacity-60" : ""
            }`}
            title={
              !isPremium ? "Upgrade to Premium to create paid lessons" : ""
            }
          >
            <option value="">Select Access</option>

            <option
              value="premium"
              disabled={!isPremium}
              title={!isPremium ? "Premium feature — requires upgrade" : ""}
            >
              Premium
            </option>

            <option value="free">Free</option>
          </select>

          {errors.accessLevel && (
            <p className="text-red-500 text-sm">{errors.accessLevel.message}</p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          Create Lesson
        </button>
      </form>
    </div>
  );
};

export default AddLesson;
