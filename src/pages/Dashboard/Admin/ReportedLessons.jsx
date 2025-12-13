import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ReportLessonTableRow from "../../../components/TableRow/ReportLessonTableRow";

const ReportedLessons = () => {
  const axios = useAxiosSecure();
  const { data: reports = [], refetch } = useQuery({
    queryKey: ["reportedLessons"],
    queryFn: async () => {
      const res = await axios.get(`/lessons?reports=true`);
      return res.data.result;
    },
  });

  return (
    <div>
      <>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Reported Count
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports ? (
                      reports.map((report) => (
                        <ReportLessonTableRow
                          key={report._id}
                          report={report}
                          refetch={refetch}
                        />
                      ))
                    ) : (
                      <p className="font-semibold text-2xl text-center">
                        No users is available
                      </p>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ReportedLessons;
