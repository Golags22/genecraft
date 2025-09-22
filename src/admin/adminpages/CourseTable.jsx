import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../database/firebase";
import { 
  FiSearch, FiPlus, FiEdit, FiTrash2, FiEye, FiSave, FiX, 
  FiUsers, FiCalendar, FiBarChart2, FiAlertTriangle 
} from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CourseTable() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

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
      toast.error("Failed to load courses", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (course.status && course.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEdit = (course) => {
    setEditingId(course.id);
    setEditData({ ...course });
  };

  const handleSave = async (id) => {
    try {
      const courseRef = doc(db, "courses", id);
      await updateDoc(courseRef, editData);
      setCourses(courses.map(course => course.id === id ? { ...course, ...editData } : course));
      setEditingId(null);
      setEditData({});
      toast.success("Course updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, "courses", id));
      setCourses(courses.filter(course => course.id !== id));
      toast.success("Course deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setDeletingId(null);
    }
  };

  const showConfirmDialog = (course) => {
    toast.info(
      <div className="p-2">
        <div className="flex items-center mb-3">
          <FiAlertTriangle className="text-red-500 mr-2 text-xl" />
          <h3 className="font-semibold">Confirm Deletion</h3>
        </div>
        <p className="text-sm mb-4">Are you sure you want to delete "{course.title}"? This action cannot be undone.</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              toast.dismiss();
              handleDelete(course.id);
            }}
            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
        className: "bg-white",
      }
    );
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
              <h3 className="text-lg font-medium text-gray-700">Loading Courses</h3>
              <p className="text-gray-500 mt-1">Please wait while we fetch your courses...</p>
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Course Management</h1>
          <p className="text-gray-600">Manage and monitor all your courses</p>
        </div>

        {/* Controls Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
              />
            </div>
            <button
              onClick={() => navigate("/admin/posting")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center"
            >
              <FiPlus className="mr-2" />
              New Course
            </button>
          </div>
        </div>

        {/* Courses Table Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <FiBarChart2 className="w-12 h-12 text-gray-300 mb-3" />
                        <h3 className="text-lg font-medium text-gray-500">No courses found</h3>
                        <p className="text-gray-400 mt-1">
                          {searchTerm ? "Try adjusting your search criteria" : "Get started by creating your first course"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                      {/* Course Title */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === course.id ? (
                          <input
                            type="text"
                            value={editData.title || ""}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 w-full focus:ring-2 focus:ring-indigo-500"
                          />
                        ) : (
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                              {course.title?.charAt(0) || "C"}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{course.title}</div>
                              <div className="text-sm text-gray-500">ID: {course.id}</div>
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Students */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === course.id ? (
                          <input
                            type="number"
                            value={editData.students || 0}
                            onChange={(e) => handleInputChange("students", parseInt(e.target.value))}
                            className="border border-gray-300 rounded px-2 py-1 w-20 focus:ring-2 focus:ring-indigo-500"
                          />
                        ) : (
                          <div>
                            <div className="text-sm text-gray-900 font-medium flex items-center">
                              <FiUsers className="mr-1" /> {course.students || 0}
                            </div>
                            <div className="text-sm text-gray-500">enrolled</div>
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === course.id ? (
                          <select
                            value={editData.status || "Draft"}
                            onChange={(e) => handleInputChange("status", e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-indigo-500"
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
                      </td>

                      {/* Progress */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === course.id ? (
                          <div className="flex items-center">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={editData.progress || 0}
                              onChange={(e) => handleInputChange("progress", parseInt(e.target.value))}
                              className="w-16 mr-2 focus:ring-2 focus:ring-indigo-500"
                            />
                            <span className="text-sm">{editData.progress || 0}%</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                              <div 
                                className="h-full bg-gradient-to-r from-green-400 to-cyan-400 rounded-full transition-all duration-300"
                                style={{ width: `${course.progress || 0}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{course.progress || 0}%</span>
                          </div>
                        )}
                      </td>

                      {/* Created Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {editingId === course.id ? (
                          <input
                            type="date"
                            value={editData.updatedDate || ""}
                            onChange={(e) => handleInputChange("updatedDate", e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-indigo-500"
                          />
                        ) : (
                          <div className="flex items-center">
                            <FiCalendar className="mr-1" />
                            {course.updatedDate || "N/A"}
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {editingId === course.id ? (
                            <>
                              <button
                                onClick={() => handleSave(course.id)}
                                className="text-green-600 hover:text-green-900 flex items-center transition-colors"
                              >
                                <FiSave className="mr-1" /> Save
                              </button>
                              <button
                                onClick={handleCancel}
                                className="text-gray-600 hover:text-gray-900 flex items-center transition-colors"
                              >
                                <FiX className="mr-1" /> Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(course)}
                                className="text-indigo-600 hover:text-indigo-900 flex items-center transition-colors"
                              >
                                <FiEdit className="mr-1" /> Edit
                              </button>
                              <button
                                onClick={() => navigate(`/admin/courses/${course.id}`)}
                                className="text-blue-600 hover:text-blue-900 flex items-center transition-colors"
                              >
                                <FiEye className="mr-1" /> View
                              </button>
                              <button
                                onClick={() => showConfirmDialog(course)}
                                disabled={deletingId === course.id}
                                className="text-red-600 hover:text-red-900 flex items-center transition-colors disabled:opacity-50"
                              >
                                {deletingId === course.id ? (
                                  <>
                                    <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-red-600 mr-1"></div>
                                    Deleting...
                                  </>
                                ) : (
                                  <>
                                    <FiTrash2 className="mr-1" /> Delete
                                  </>
                                )}
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}