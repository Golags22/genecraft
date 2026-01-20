import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../database/firebase";
import { useState, useEffect } from "react";
import PaymentButton from "../admin/adminpages/PaymentButton";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  // Fetch single course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseRef = doc(db, "courses", id);
        const courseSnap = await getDoc(courseRef);
        if (courseSnap.exists()) {
          setCourse({ id: courseSnap.id, ...courseSnap.data() });
        } else {
          setCourse(null);
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setCourse(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  // Check if user has purchased course
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

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!course)
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold">Course Not Found</h2>
        <button
          onClick={() => navigate("/courses")}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Back to Courses
        </button>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Course Image */}
      <div className="mb-6">
        <img
          src={course.image}
          alt={course.title}
          className="w-full rounded-lg shadow-md"
        />
      </div>

      {/* Course Info */}
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="text-gray-700 mb-6">{course.description}</p>

      {/* Course Stats */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-gray-600">Price: ${course.price}</span>
        <span className="text-gray-600">Category: {course.category}</span>
        <span className="text-gray-600">Rating: {course.rating || 0}/5</span>
      </div>

      {/* Access Control */}
      {auth.currentUser ? (
        hasAccess ? (
          <button
            onClick={() => navigate(`/student/dashboard`)} // Redirect to dashboard
            className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
          >
            Continue Learning
          </button>
        ) : (
          <PaymentButton course={course} userId={auth.currentUser.uid} />
        )
      ) : (
        <div className="space-y-2">
          <button
            onClick={() => navigate("/users/login")}
            className="w-full py-3 bg-blue-600 text-white rounded-lg"
          >
            Login to Enroll
          </button>
          <button
            onClick={() => navigate("/users/signup")}
            className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg"
          >
            Create Free Account
          </button>
        </div>
      )}
    </div>
  );
}
