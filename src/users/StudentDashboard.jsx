import { useState, useEffect } from "react";
import { FaBook, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../database/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { EnrolledCourses } from "./pages";

export default function StudentDashboard() {
  const [active, setActive] = useState("Dashboard");
  const [userData, setUserData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserData(user.uid);
      } else {
        navigate("/users/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const data = { id: userDoc.id, ...userDoc.data() };
        setUserData(data);

        // Fetch all courses the user has access to
        if (data.courses) {
          const enrolledCourses = [];
          for (const courseId of Object.keys(data.courses)) {
            const courseDoc = await getDoc(doc(db, "courses", courseId));
            if (courseDoc.exists()) enrolledCourses.push({ id: courseDoc.id, ...courseDoc.data() });
          }
          setCourses(enrolledCourses);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/users/login");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col">
        <div className="p-6 font-bold text-2xl border-b border-blue-500">Student Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { name: "Dashboard", action: () => setActive("Dashboard") },
            { name: "Profile", action: () => setActive("Profile") },
            { name: "Settings", action: () => setActive("Settings") },
            { name: "Logout", action: handleLogout },
          ].map((item) => (
            <button
              key={item.name}
              onClick={item.action}
              className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
                active === item.name ? "bg-white text-blue-600 font-semibold" : "hover:bg-blue-500"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">{active}</h1>

        {active === "Dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.length === 0 && (
              <p className="text-gray-500 col-span-full">You have not enrolled in any courses yet.</p>
            )}
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{course.title}</h2>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{course.description}</p>
                  <button
                    onClick={() => navigate(`/learn/${course.id}`)}
                    className="mt-4 w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {active === "Profile" && userData && (
          <div className="bg-white p-6 rounded-xl shadow max-w-md">
            {/* ...Your profile details code */}
          </div>
        )}
<EnrolledCourses />
        {active === "Settings" && userData && (
          <div className="bg-white p-6 rounded-xl shadow max-w-2xl">
            {/* ...Your settings code */}
          </div>
        )}
      </main>
    </div>
  );
}
