import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const UpdateLessonForm = ({ lesson, isPremium, onUpdate }) => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: lesson.title,
      description: lesson?.description,
      category: lesson?.category,
      emotionalTone: lesson?.emotionalTone,
      visibility: lesson?.visibility,
      accessLevel: lesson?.accessLevel,
      creatorName: user?.displayName,
      creatorEmail: user?.email,
    },
  });
  useEffect(() => {
    if (lesson) {
      reset({
        ...lesson,
        creatorName: user?.displayName,
        creatorEmail: user?.email,
      });
    }
  }, [lesson, reset, user]);
  const onSubmit = (data) => {
    const updateData = { ...data };
    onUpdate(updateData);
    document.getElementById("updateModal").close();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title */}
      <div>
        <label className="font-semibold">Lesson Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          className="w-full p-2 border rounded mt-1"
          type="text"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="font-semibold">Full Description / Story</label>
        <textarea
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 20,
              message: "Description must be at least 20 characters",
            },
          })}
          className="w-full p-2 border rounded mt-1 h-28"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="font-semibold">Category</label>
        <select
          {...register("category", { required: "Category is required" })}
          className="w-full p-2 border rounded mt-1"
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

      {/* Tone */}
      <div>
        <label className="font-semibold">Emotional Tone</label>
        <select
          {...register("emotionalTone", { required: "Tone is required" })}
          className="w-full p-2 border rounded mt-1"
        >
          <option value="">Select Tone</option>
          <option value="Motivational">Motivational</option>
          <option value="Sad">Sad</option>
          <option value="Realization">Realization</option>
          <option value="Gratitude">Gratitude</option>
        </select>
        {errors.emotionalTone && (
          <p className="text-red-500 text-sm">{errors.emotionalTone.message}</p>
        )}
      </div>

      {/* Visibility */}
      <div>
        <label className="font-semibold">Visibility</label>
        <select
          {...register("visibility", { required: "Visibility is required" })}
          className="w-full p-2 border rounded mt-1"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        {errors.visibility && (
          <p className="text-red-500 text-sm">{errors.visibility.message}</p>
        )}
      </div>

      {/* Access Level */}
      <div>
        <label className="font-semibold">Access Level</label>
        <select
          {...register("accessLevel", { required: "Access level is required" })}
          disabled={!isPremium}
          className={`w-full p-2 border rounded mt-1 ${
            !isPremium ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </select>
        {errors.accessLevel && (
          <p className="text-red-500 text-sm">{errors.accessLevel.message}</p>
        )}
      </div>

      {/* Creator Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-semibold">Creator Name</label>
          <input
            {...register("creatorName")}
            disabled
            className="w-full p-2 border rounded mt-1 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="font-semibold">Creator Email</label>
          <input
            {...register("creatorEmail")}
            disabled
            className="w-full p-2 border rounded mt-1 bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Update Lesson
      </button>
    </form>
  );
};
export default UpdateLessonForm;
