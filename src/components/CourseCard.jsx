import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <Link to={course.url} className="block">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative pb-48 overflow-hidden">
        <img 
          className="absolute inset-0 h-full w-full object-cover"
          src={course.image} 
          alt={course.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            course.difficulty === 'Beginner' 
              ? 'bg-green-100 text-green-800' 
              : course.difficulty === 'Intermediate' 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {course.difficulty}
          </span>
        </div>
      </div>
      // Here is the video section
      <video src={course.video} 
      controls
      >{course.video}</video>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">{course.category}</span>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
              {course.rating} ({course.reviews})
            </span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8 rounded-full" src={course.instructor.avatar} alt={course.instructor.name} />
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {course.instructor.title} {course.instructor.name}
              </p>
            </div>
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {course.price === 0 ? 'Free' : `$${course.price}`}
          </div>
          <Link 
          to={`/courses/${course.id}`}
          className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
          View Details
          </Link>
        </div>
      </div>
    </div>
    </Link>
  );
}