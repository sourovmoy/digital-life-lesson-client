import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const AdminHome = () => {
  const axios = useAxiosSecure();
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const res = await axios.get("/admin/overview");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 mt-10">
        Failed to load dashboard stats.
      </div>
    );
  }
  console.log(stats);

  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
          <StatCard title="Total Users" value={stats.totalUser} />
          <StatCard title="Public Lessons" value={stats.totalPublicLessons} />
          <StatCard
            title="Reported Lessons"
            value={stats.totalReportedLessons}
          />
          <StatCard title="Today's Lessons" value={stats.todaysLessons} />
          <StatCard
            title="Top Contributors"
            value={stats.mostActiveContributors.length}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Top Contributors</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Lessons Created</th>
                </tr>
              </thead>
              <tbody>
                {stats.mostActiveContributors.map((contributor, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2">{contributor.email}</td>
                    <td className="px-4 py-2">{contributor.lessonCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white shadow rounded-lg p-4 text-center">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-3xl font-bold text-blue-600">{value}</p>
  </div>
);

export default AdminHome;
