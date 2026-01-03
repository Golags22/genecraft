import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../database/firebase";
import { useState, useEffect } from "react";
import {
  FaStar,
  FaRegStar,
  FaPlay,
  FaClock,
  FaUserGraduate,
  FaBook,
  FaCheckCircle,
  FaLock,
  FaArrowLeft,
  FaShareAlt,
  FaHeart,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import PaymentButton from "../admin/adminpages/PaymentButton";
// import Loading from "../ui/Loading";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [isLiked, setIsLiked] = useState(false);

  const course = courses.find((c) => c.id === id);

  // 🔹 Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const snapshot = await getDocs(collection(db, "courses"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // 🔹 Check if student already owns this course
  useEffect(() => {
    const checkAccess = async () => {
      if (!auth.currentUser || !course) return;

      const accessRef = doc(
        db,
        "users",
        auth.currentUser.uid,
        "courses",
        course.id
      );

      const snap = await getDoc(accessRef);
      setHasAccess(snap.exists());
    };

    checkAccess();
  }, [course]);

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />);
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(
          <div key={i} className="relative">
            <FaRegStar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <FaStar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<FaRegStar key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />);
      }
    }
    return stars;
  };

  // if (isLoading) {
  //   return <Loading variant="minimal" message="Loading course details..." />;
  // }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Course Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back Button - Mobile */}
      <div className="lg:hidden p-4">
        <button
          onClick={() => navigate("/courses")}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </button>
      </div>

      {/* HERO SECTION */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-8">
            <div className="flex-1">
              {/* Back Button - Desktop */}
              <div className="hidden lg:block mb-6">
                <button
                  onClick={() => navigate("/courses")}
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  <FaArrowLeft className="w-4 h-4 mr-2" />
                  Back to Courses
                </button>
              </div>

              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-sm font-medium mb-3">
                  {course.category || "Professional Course"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {course.title}
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-3xl">
                {course.description}
              </p>

              {/* Course Stats */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base">
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {renderStars(course.rating || 0)}
                  </div>
                  <span className="font-medium">{course.rating || 0}/5</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-300">{course.reviewCount || 0} reviews</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <FaUserGraduate className="w-4 h-4 mr-2" />
                  <span>{course.students?.toLocaleString() || "0"} students</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <FaClock className="w-4 h-4 mr-2" />
                  <span>{course.duration || "Self-paced"}</span>
                </div>

                <div className="flex items-center text-gray-300">
                  <FaBook className="w-4 h-4 mr-2" />
                  <span>{course.lessonCount || course.curriculum?.length || 0} modules</span>
                </div>
              </div>
            </div>

            {/* Action Buttons - Mobile Top */}
            <div className="lg:hidden flex items-center justify-between gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-lg ${isLiked ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-gray-300 hover:text-white'}`}
              >
                <FaHeart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3 bg-white/10 rounded-lg text-gray-300 hover:text-white">
                <FaShareAlt className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* LEFT COLUMN - Course Content */}
          <div className="lg:col-span-2">
            {/* What You'll Learn */}
            {course.outcomes && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  What You'll Learn
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.outcomes.slice(0, 6).map((outcome, index) => (
                    <div key={index} className="flex items-start">
                      <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course Curriculum */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Course Content
                </h2>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {course.curriculum?.length || 0} sections • {course.totalLessons || "Multiple"} lessons
                </span>
              </div>

              <div className="space-y-4">
                {course.curriculum?.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection(sectionIndex)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                          <span className="text-blue-600 dark:text-blue-400 font-semibold">
                            {sectionIndex + 1}
                          </span>
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {section.sectionTitle}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {section.lessons?.length || 0} lessons • {section.duration || "Varies"}
                          </p>
                        </div>
                      </div>
                      {expandedSections[sectionIndex] ? (
                        <FaChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <FaChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </button>

                    {expandedSections[sectionIndex] && section.lessons && (
                      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
                        <div className="space-y-3">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lessonIndex}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >
                              <div className="flex items-center">
                                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 mr-3">
                                  <FaPlay className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                </div>
                                <div>
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {lesson.title}
                                  </span>
                                  {lesson.description && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                      {lesson.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {lesson.duration}
                                </span>
                                {hasAccess ? (
                                  <button
                                    onClick={() => navigate(`/learn/${course.id}/${sectionIndex}/${lessonIndex}`)}
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                                  >
                                    Start
                                  </button>
                                ) : (
                                  <FaLock className="w-4 h-4 text-gray-400" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Sidebar */}
          <div className="lg:sticky lg:top-6 h-fit">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Course Image */}
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full ${isLiked ? 'bg-red-500 text-white' : 'bg-black/50 text-white hover:bg-black/70'}`}
                  >
                    <FaHeart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${course.price?.toLocaleString()}
                    </span>
                    {course.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${course.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {course.discount && (
                    <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded mt-2">
                      Save {course.discount}%
                    </span>
                  )}
                </div>

                {/* Access Control */}
                <div className="space-y-4">
                  {auth.currentUser ? (
                    hasAccess ? (
                      <button
                        onClick={() => navigate(`/learn/${course.id}`)}
                        className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center justify-center"
                      >
                        <FaPlay className="w-4 h-4 mr-2" />
                        Continue Learning
                      </button>
                    ) : (
                      <PaymentButton
                        course={course}
                        userId={auth.currentUser.uid}
                        className="w-full"
                      />
                    )
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={() => navigate("/users/login")}
                        className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                      >
                        Login to Enroll
                      </button>
                      <button
                        onClick={() => navigate("/users/signup")}
                        className="w-full py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      >
                        Create Free Account
                      </button>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <div className="flex items-center text-sm">
                    <FaCheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Full lifetime access</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FaCheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Certificate of completion</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FaCheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">30-Day money-back guarantee</span>
                  </div>
                </div>

                {/* Share Section */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Share this course</p>
                  <div className="flex gap-2">
                    {['Facebook', 'Twitter', 'LinkedIn', 'WhatsApp'].map((platform) => (
                      <button
                        key={platform}
                        className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}