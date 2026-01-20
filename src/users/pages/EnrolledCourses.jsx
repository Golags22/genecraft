import { useState, useEffect } from "react";
import { auth, db } from "../../../database/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function EnrolledCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!auth.currentUser) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const userId = auth.currentUser.uid;
        console.log("Current User ID:", userId);
        
        // Debug: Try to fetch ALL transactions first to see data structure
        const allTransactionsRef = collection(db, "transactions");
        const allTransactionsSnap = await getDocs(allTransactionsRef);
        
        console.log("All transactions in database:");
        allTransactionsSnap.docs.forEach(doc => {
          console.log(doc.id, doc.data());
        });

        // 1️⃣ Fetch user's transactions
        const transactionsRef = collection(db, "transactions");
        const transactionsQuery = query(
          transactionsRef,
          where("userId", "==", userId),
          where("status", "==", "successful")
        );

        console.log("Querying transactions for userId:", userId);
        const transactionsSnap = await getDocs(transactionsQuery);
        
        console.log("Found transactions:", transactionsSnap.docs.length);
        transactionsSnap.docs.forEach(doc => {
          console.log("Transaction:", doc.id, doc.data());
        });

        if (transactionsSnap.empty) {
          console.log("No successful transactions found for user");
          setEnrolledCourses([]);
          setDebugInfo({
            userId,
            transactionCount: 0,
            message: "No successful transactions found"
          });
          return;
        }

        // Extract course IDs from transactions
        const transactionsData = transactionsSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log("Transactions data:", transactionsData);
        
        const enrolledCourseIds = [...new Set(transactionsData.map(t => t.courseId))];
        console.log("Unique course IDs:", enrolledCourseIds);

        // Filter out any invalid IDs
        const validCourseIds = enrolledCourseIds.filter(id => 
          id && typeof id === 'string' && id.trim() !== ""
        );
        
        console.log("Valid course IDs:", validCourseIds);

        if (validCourseIds.length === 0) {
          console.log("No valid course IDs found");
          setEnrolledCourses([]);
          setDebugInfo({
            userId,
            transactionCount: transactionsSnap.docs.length,
            courseIds: [],
            message: "No valid course IDs in transactions"
          });
          return;
        }

        // 2️⃣ Fetch course details
        console.log("Fetching courses for IDs:", validCourseIds);
        
        // Fetch all courses and filter locally (simpler for debugging)
        const coursesRef = collection(db, "courses");
        const allCoursesSnap = await getDocs(coursesRef);
        
        console.log("Total courses in database:", allCoursesSnap.docs.length);
        allCoursesSnap.docs.forEach(doc => {
          console.log("Course:", doc.id, doc.data().title);
        });

        const coursesData = allCoursesSnap.docs
          .filter(doc => validCourseIds.includes(doc.id))
          .map(doc => ({ id: doc.id, ...doc.data() }));

        console.log("Filtered enrolled courses:", coursesData.length);
        console.log("Courses data:", coursesData);

        setEnrolledCourses(coursesData);
        setDebugInfo({
          userId,
          transactionCount: transactionsSnap.docs.length,
          courseIds: validCourseIds,
          coursesFound: coursesData.length
        });

      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        setError(`Failed to load courses: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [navigate]);

  // Debug view component
  const DebugView = () => (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold mb-2">Debug Information:</h3>
      <pre className="text-sm bg-white p-3 rounded overflow-auto max-h-60">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
      <p className="text-sm text-gray-600 mt-2">
        Check browser console for more details.
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading your courses...</p>
        </div>
        <DebugView />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate("/courses")}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Browse Courses
          </button>
        </div>
        <DebugView />
      </div>
    );
  }

  if (enrolledCourses.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No enrolled courses found</h3>
        <p className="text-gray-600 mb-6">
          You haven't enrolled in any courses yet, or there might be an issue loading your courses.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => navigate("/courses")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Browse Courses
          </button>
          <button
            onClick={() => window.location.reload()}
            className="ml-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Refresh Page
          </button>
        </div>
        <DebugView />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Courses ({enrolledCourses.length})</h1>
        <button
          onClick={() => window.location.reload()}
          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          Refresh
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => (
          <div 
            key={course.id} 
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
          >
            <div className="relative">
              <img
                src={course.image || "https://via.placeholder.com/300x200?text=Course+Image"}
                alt={course.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x200?text=Course+Image";
                }}
              />
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs p-2">
                <span className="font-bold">ENROLLED</span>
              </div>
              {course.category && (
                <span className="absolute top-10 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                  {course.category}
                </span>
              )}
            </div>
            
            <div className="p-5">
              <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                {course.title}
              </h2>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {course.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                {course.instructor?.name && (
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-blue-600 text-sm font-semibold">
                        {course.instructor.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">{course.instructor.name}</p>
                      <p className="text-xs text-gray-500">{course.instructor.title}</p>
                    </div>
                  </div>
                )}
                
                {course.duration && (
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    ⏱️ {course.duration}
                  </span>
                )}
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={() => navigate(`/learn/${course.id}`)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <DebugView />
    </div>
  );
}