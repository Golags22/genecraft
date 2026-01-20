import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      
      {/* Course Image */}
      <div className="relative h-48">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 text-xs font-semibold rounded">
          {course.level || "All Levels"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="text-sm text-gray-500">{course.category}</span>

        <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
          {course.title}
        </h3>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center mt-4">
          <img
            src={course.instructor?.avatar}
            alt={course.instructor?.name}
            className="h-8 w-8 rounded-full"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            {course.instructor?.name}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-5">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ₦{course.price?.toLocaleString()}
          </span>

          <Link
            to={`/courses/${course.id}`}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
