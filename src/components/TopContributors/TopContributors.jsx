import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../Shared/LoadingSpinner";
import useAxios from "../../hooks/useAxios";
import { FaUserCircle } from "react-icons/fa";

const TopContributors = () => {
  const axios = useAxios();
  const { data: contributors = [], isLoading } = useQuery({
    queryKey: ["topContributors"],
    queryFn: async () => {
      const res = await axios.get("/users/top-contributors");
      return res.data.result;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h3 className="text-2xl font-bold mb-10 text-center">Top Contributors</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 pt-10">
        {contributors.map((user) => (
          <div key={user._id} className="text-center">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.name}
                className="mx-auto rounded-full w-16 h-16 object-cover"
              />
            ) : (
              <FaUserCircle className="mx-auto rounded-full w-16 h-16 object-cover" />
            )}

            <h4 className="mt-2 font-semibold text-sm">{user.name}</h4>
            <p className="text-xs text-gray-500">{user.totalLessons} Lessons</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContributors;
