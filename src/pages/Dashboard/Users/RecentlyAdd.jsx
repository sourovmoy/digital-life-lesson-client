import React from "react";

const RecentlyAdd = () => {
  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Recently Added Lessons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* {recentLessons.map((lesson) => (
            <div key={lesson._id} className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-bold">{lesson.title}</h3>
              <p className="text-sm text-gray-500">
                {lesson.description.slice(0, 60)}...
              </p>
              <span className="text-xs text-gray-400">
                {new Date(lesson.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default RecentlyAdd;
