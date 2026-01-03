import CourseCard from './../components/CourseCard';
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../database/firebase";

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
//fetching courses from firebase
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Get unique categories
  const categories = ['All', ...new Set(courses.map(course => course.category))];

  // Filter courses by category
  const filteredCourses = activeCategory === 'All'
    ? courses
    : courses.filter(course => course.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 lg:mt-[50px]">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Our <span className="text-blue-600 dark:text-blue-400">Courses</span>
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          Expand your knowledge with our expertly crafted courses
        </p>
      </div>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto mb-12 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading courses...</p>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No courses found</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">We couldn't find any courses in this category.</p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto mt-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white">Can't find what you're looking for?</h2>
          <p className="mt-2 text-blue-100 max-w-2xl mx-auto">
            We're constantly adding new courses. Let us know what you'd like to learn!
          </p>
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow hover:bg-gray-100 transition-colors duration-200">
            Suggest a Course
          </button>
        </div>
      </div>
    </div>
  );
}
