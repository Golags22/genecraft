import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../database/firebase";
import Sidebar from "./Sidebar";
import { FiArrowLeft, FiSave, FiEdit, FiUsers, FiCalendar, FiBarChart2, FiBook } from "react-icons/fi";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "courses", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const courseData = { id: docSnap.id, ...docSnap.data() };
        setCourse(courseData);
        setEditData(courseData);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const courseRef = doc(db, "courses", id);
      await updateDoc(courseRef, editData);
      setCourse(editData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Archived": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-0 lg:ml-64 p-6">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-700">Loading Course</h3>
              <p className="text-gray-500 mt-1">Please wait while we fetch the course details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-0 lg:ml-64 p-6">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <FiBook className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700">Course not found</h3>
              <p className="text-gray-500 mt-1">The course you're looking for doesn't exist.</p>
              <button
                onClick={() => navigate("/admin/coursetable")}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Back to Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-0 lg:ml-64 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/admin/coursetable")}
              className="flex items-center text-gray-600 hover:text-indigo-600 mr-4"
            >
              <FiArrowLeft className="mr-2" /> Back to Courses
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Course Details</h1>
          </div>
          {isEditing ? (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700 transition-colors"
              >
                <FiSave className="mr-2" /> Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditData(course);
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700 transition-colors"
            >
              <FiEdit className="mr-2" /> Edit Course
            </button>
          )}
        </div>

        {/* Course Details Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Course Information</h2>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Course Title</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.title || ""}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{course.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Course ID</label>
                  <p className="text-gray-900">{course.id}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                  {isEditing ? (
                    <select
                      value={editData.status || "Draft"}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="Active">Active</option>
                      <option value="Draft">Draft</option>
                      <option value="Archived">Archived</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
                      {course.status || "Draft"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Statistics</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <FiUsers className="text-gray-400 mr-3" />
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Students Enrolled</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData.students || 0}
                        onChange={(e) => handleInputChange("students", parseInt(e.target.value))}
                        className="w-20 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{course.students || 0}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <FiBarChart2 className="text-gray-400 mr-3" />
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Progress</label>
                    {isEditing ? (
                      <div className="flex items-center">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={editData.progress || 0}
                          onChange={(e) => handleInputChange("progress", parseInt(e.target.value))}
                          className="mr-2"
                        />
                        <span>{editData.progress || 0}%</span>
                      </div>
                    ) : (
                      <p className="text-gray-900">{course.progress || 0}%</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <FiCalendar className="text-gray-400 mr-3" />
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editData.updatedDate || ""}
                        onChange={(e) => handleInputChange("updatedDate", e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{course.updatedDate || "N/A"}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="p-6 border-t border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
            {isEditing ? (
              <textarea
                value={editData.description || ""}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter course description..."
              />
            ) : (
              <p className="text-gray-700">
                {course.description || "No description available."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}