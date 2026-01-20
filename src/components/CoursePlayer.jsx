import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../../database/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import {
  FaPlay,
  FaArrowLeft,
  FaCheckCircle,
  FaLock,
  FaFire
} from "react-icons/fa";

export default function CoursePlayer() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);

  // 🔧 Convert gs:// URI to downloadable URL
  const getFirebaseVideoUrl = async (gsUrl) => {
    if (!gsUrl) return null;
    
    try {
      // If it's already a regular HTTP URL, return it
      if (gsUrl.startsWith('http')) {
        return gsUrl;
      }
      
      // Convert gs:// to storage reference
      if (gsUrl.startsWith('gs://')) {
        // Extract the path after the bucket name
        const bucketPath = gsUrl.replace('gs://genecraft-7a1e9.firebasestorage.app/', '');
        
        // Create storage reference
        const storageRef = ref(storage, bucketPath);
        
        // Get download URL
        const downloadUrl = await getDownloadURL(storageRef);
        return downloadUrl;
      }
      
      return gsUrl;
    } catch (error) {
      console.error('Error getting video URL:', error);
      return null;
    }
  };

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          navigate("/users/login");
          return;
        }

        // 🔐 CHECK COURSE ACCESS
        const accessRef = doc(db, "users", user.uid, "courses", courseId);
        const accessSnap = await getDoc(accessRef);

        if (!accessSnap.exists()) {
          navigate(`/courses/${courseId}`);
          return;
        }

        setHasAccess(true);

        // 📘 FETCH COURSE
        const courseRef = doc(db, "courses", courseId);
        const courseSnap = await getDoc(courseRef);

        if (!courseSnap.exists()) {
          navigate("/courses");
          return;
        }

        const courseData = {
          id: courseSnap.id,
          ...courseSnap.data(),
        };

        setCourse(courseData);

        // 🎯 SET FIRST LESSON (IF ANY)
        const firstLesson = courseData.curriculum?.[0]?.lessons?.[0] || null;
        setActiveLesson(firstLesson);

        // 🎥 GET VIDEO URL
        const videoSource = firstLesson?.video || courseData.video;
        if (videoSource) {
          setVideoLoading(true);
          const url = await getFirebaseVideoUrl(videoSource);
          setVideoUrl(url);
          setVideoLoading(false);
        }

      } catch (err) {
        console.error("Failed to load course:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId, navigate]);

  // Update video when active lesson changes
  useEffect(() => {
    const updateVideo = async () => {
      if (course && activeLesson) {
        const videoSource = activeLesson.video || course.video;
        if (videoSource) {
          setVideoLoading(true);
          const url = await getFirebaseVideoUrl(videoSource);
          setVideoUrl(url);
          setVideoLoading(false);
        }
      }
    };
    
    updateVideo();
  }, [activeLesson]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course content...</p>
        </div>
      </div>
    );
  }

  if (!course || !hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaLock className="text-4xl text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">You don't have access to this course</p>
          <button
            onClick={() => navigate("/student/dashboard")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* MAIN CONTENT AREA */}
      <div className="flex-1 p-4 lg:p-6">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/student/dashboard")}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Dashboard
        </button>

        {/* VIDEO PLAYER */}
        <div className="bg-black rounded-xl overflow-hidden mb-6 shadow-lg">
          {!videoUrl ? (
            <div className="h-96 flex flex-col items-center justify-center bg-gray-800">
              <FaLock className="text-4xl text-gray-400 mb-4" />
              <p className="text-white text-lg">No video content available</p>
              <p className="text-gray-400 mt-2">This course doesn't have any video content</p>
            </div>
          ) : (
            <div className="relative">
              {videoLoading ? (
                <div className="h-96 flex items-center justify-center bg-gray-800">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                    <p className="text-white mt-3">Loading video...</p>
                  </div>
                </div>
              ) : (
                <>
                  <video
                    key={videoUrl}
                    controls
                    src={videoUrl}
                    className="w-full h-96 bg-black"
                    onError={() => setVideoError(true)}
                    poster={course.image}
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                    <track kind="captions" />
                  </video>
                  
                  {/* Video source badge */}
                  <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    <FaFire className="text-orange-500" />
                    <span>Firebase Storage</span>
                  </div>
                  
                  {videoError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90">
                      <FaLock className="text-4xl text-red-500 mb-4" />
                      <p className="text-white text-lg">Failed to load video</p>
                      <p className="text-gray-400 text-sm mt-2">
                        Please check Firebase Storage rules
                      </p>
                      <button 
                        onClick={() => setVideoError(false)}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* CURRENT LESSON/CONTENT INFO */}
        <div className="bg-white rounded-xl p-6 shadow mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold mb-3">
            {activeLesson?.title || course.title}
          </h1>
          
          {activeLesson?.description || course.description ? (
            <>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {activeLesson?.duration || course.duration || 'No duration'}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {activeLesson?.difficulty || course.difficulty || 'All levels'}
                </span>
                {course.language && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    {course.language}
                  </span>
                )}
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {activeLesson?.description || course.description}
              </p>
            </>
          ) : (
            <p className="text-gray-600 italic">
              Select a lesson from the sidebar to view its content
            </p>
          )}
        </div>

        {/* LEARNING OUTCOMES */}
        {course.learningOutcomes?.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
            <ul className="space-y-2">
              {course.learningOutcomes.map((outcome, index) => (
                <li key={index} className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* SIDEBAR - CURRICULUM */}
      <div className="w-full lg:w-96 bg-white border-t lg:border-l lg:border-t-0 p-4 lg:p-6 overflow-y-auto">
        <div className="sticky top-0 bg-white pb-4 z-10">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Course Curriculum
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            {course.curriculum?.length || 0} sections • {
              course.curriculum?.reduce(
                (total, section) => total + (section.lessons?.length || 0), 
                0
              ) || 0
            } lessons
          </p>
        </div>

        {course.curriculum?.length > 0 ? (
          <div className="space-y-6">
            {course.curriculum.map((section, sIndex) => (
              <div key={sIndex} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b">
                  <h3 className="font-semibold text-gray-800">
                    Section {sIndex + 1}: {section.sectionTitle}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {section.lessons?.length || 0} lessons
                  </p>
                </div>
                
                <div className="divide-y">
                  {section.lessons?.map((lesson, lIndex) => (
                    <button
                      key={lIndex}
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full flex items-center justify-between p-4 text-left transition-all ${
                        activeLesson?.id === lesson.id
                          ? "bg-blue-50 border-l-4 border-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center flex-1">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          activeLesson?.id === lesson.id
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-500"
                        }`}>
                          <FaPlay className="text-xs" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">
                            {lesson.title}
                          </div>
                          {lesson.duration && (
                            <div className="text-xs text-gray-500 mt-1">
                              {lesson.duration}
                            </div>
                          )}
                        </div>
                      </div>
                      <FaCheckCircle className={`text-sm ml-2 ${
                        activeLesson?.id === lesson.id
                          ? "text-blue-500"
                          : "text-gray-300"
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No curriculum available</p>
          </div>
        )}

        {/* INSTRUCTOR INFO */}
        {course.instructor && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-3">Instructor</h3>
            <div className="flex items-center">
              {course.instructor.avatar ? (
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
              ) : (
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">
                    {course.instructor.name?.charAt(0) || 'I'}
                  </span>
                </div>
              )}
              <div>
                <h4 className="font-semibold">
                  {course.instructor.title} {course.instructor.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {course.instructor.numbersofcourses || 0} courses
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}