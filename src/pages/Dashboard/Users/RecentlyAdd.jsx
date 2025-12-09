import React from "react";
import { Link } from "react-router";

const RecentlyAdd = ({ totalCreated: recentLessons }) => {
  return (
    <div className="min-h-50">
      <h2 className="text-xl font-semibold mb-3">Recently Added Lessons</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recentLessons.length === 0 ? (
          <div>
            <p className="text-2xl text-center font-medium">
              You don't created any lessons
            </p>
          </div>
        ) : (
          recentLessons.map((lesson) => (
            <Link
              to={`/lessons/${lesson._id}`}
              key={lesson._id}
              className="p-4 bg-white rounded-lg shadow"
            >
              <h3 className="font-bold">{lesson.title}</h3>
              <p className="text-sm text-gray-500">
                {lesson.description.slice(0, 60)}...
              </p>
              <span className="text-xs text-gray-400">
                {new Date(lesson.createdAt).toLocaleDateString()}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentlyAdd;
