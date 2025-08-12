import { useParams } from "react-router-dom";
import { courses } from "../Data/data";
import { FaStar, FaRegStar, FaPlay, FaClock, FaUserGraduate } from "react-icons/fa";

export default function CourseDetails() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-md text-center">
          <svg
            className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
            Course Not Found
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/courses"
            className="mt-6 inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Browse All Courses
          </a>
        </div>
      </div>
    );
  }

  // Calculate star rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(course.rating);
    const hasHalfStar = course.rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Course Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            className="w-full h-full object-cover opacity-30"
            src={course.image}
            alt={course.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-gray-900/40" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {course.title}
              </h1>
              <p className="mt-3 max-w-3xl text-xl text-gray-300">
                {course.description || course.description.substring(0, 100) + "..."}
              </p>
              <div className="mt-6 flex items-center space-x-5">
                <div className="flex items-center">
                  {renderStars()}
                  <span className="ml-2 text-sm font-medium text-gray-300">
                    {course.rating} ({course.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <FaUserGraduate className="mr-1.5" />
                  {course.students} students
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <FaClock className="mr-1.5" />
                  {course.duration}
                </div>
              </div>
              <div className="mt-6">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    course.difficulty === "Beginner"
                      ? "bg-green-100 text-green-800"
                      : course.difficulty === "Intermediate"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {course.difficulty} Level
                </span>
              </div>
            </div>
            <div className="mt-8 flex md:mt-0 md:ml-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-80">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={course.image}
                    alt={course.title}
                  />
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {course.price === 0 ? "Free" : `$${course.price}`}
                  </span>
                  {course.originalPrice && (
                    <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                      ${course.originalPrice}
                    </span>
                  )}
                </div>
                <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200">
                  <FaPlay className="mr-2" /> Enroll Now
                </button>
                <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                  30-Day Money-Back Guarantee
                </p>
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    This course includes:
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {[
                      "Full lifetime access",
                      "Certificate of completion",
                      "Downloadable resources",
                      "Access on mobile and TV",
                    ].map((item) => (
                      <li key={item} className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* What You'll Learn */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                What you'll learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.learningOutcomes?.map((outcome, index) => (
                  <div key={index} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Course content
              </h2>
              <div className="space-y-4">
                {course.curriculum?.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Section {sectionIndex + 1}: {section.sectionTitle}
                    </h3>
                    <div className="space-y-2">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150"
                        >
                          <div className="flex items-center cursor-pointer">
                            <FaPlay className="h-4 w-4 text-gray-400 mr-3" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {lesson.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Description
              </h2>
              <div className="prose max-w-none text-gray-700 dark:text-gray-300">
                <p>{course.description}</p>
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Instructor
              </h2>
              <div className="flex items-start">
                <img
                  className="h-16 w-16 rounded-full object-cover mr-4"
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                   {course.instructor.title} {course.instructor.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {course.title}
                  </p>
                  <div className="mt-2 flex items-center">
                    {renderStars()}
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      {course.instructor.rating} Instructor Rating
                    </span>
                  </div>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{course.students} Students</span>
                    <span>{course.instructor.numbersofcourses} Courses</span>
                  </div>
                  <p className="mt-3 text-gray-700 dark:text-gray-300">
                    {course.instructor.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-12 lg:mt-0 lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 sticky top-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Course Details
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Category
                  </h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {course.category}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Last Updated
                  </h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {course.updatedDate || "N/A"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Language
                  </h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {course.language || "English"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Subtitles
                  </h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {course.subtitles?.join(", ") || "None"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}