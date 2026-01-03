import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy 
} from "firebase/firestore";
import { db } from "../../../database/firebase";
import { 
  FiSearch, FiPlus, FiEdit, FiTrash2, FiEye, FiSave, FiX, 
  FiUsers, FiCalendar, FiBarChart2, FiAlertTriangle,
  FiGlobe, FiDollarSign, FiBook, FiClock, FiTag,
  FiVideo, FiImage, FiBookOpen, FiTarget, FiUser
} from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CourseTable() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEditingCourse, setCurrentEditingCourse] = useState(null);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  // 🎯 STEP 1: Load all courses from Firebase
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "courses"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
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

  // 🔍 STEP 2: Search functionality
  const filteredCourses = courses.filter(course =>
    course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (course.instructor?.name && course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // ✏️ STEP 3: Open edit modal with ALL the data from Posting form
  const openEditModal = (course) => {
    setCurrentEditingCourse(course);
    
    // Prepare ALL the data exactly like in Posting form
    setEditData({
      // Basic Info (matches Posting form)
      title: course.title || "",
      description: course.description || "",
      category: course.category || "Medical",
      duration: course.duration || "",
      difficulty: course.difficulty || "Beginner",
      image: course.image || "",
      video: course.video || "",
      
      // Pricing (matches Posting form)
      price: course.price || 0,
      originalPrice: course.originalPrice || 0,
      
      // Instructor (matches Posting form structure)
      instructor: {
        title: course.instructor?.title || "Mr.",
        name: course.instructor?.name || "",
        numbersofcourses: course.instructor?.numbersofcourses || 0,
        avatar: course.instructor?.avatar || ""
      },
      
      // Learning Outcomes (matches Posting form)
      learningOutcomes: course.learningOutcomes?.length > 0 
        ? [...course.learningOutcomes] 
        : [""],
      
      // Curriculum (matches Posting form structure)
      curriculum: course.curriculum?.length > 0 
        ? [...course.curriculum] 
        : [{
            sectionTitle: "",
            lessons: [{ id: 1, title: "", duration: "" }]
          }],
      
      // Additional fields
      status: course.status || "Draft",
      language: course.language || "English",
      students: course.students || 0,
      rating: course.rating || 0,
      reviews: course.reviews || 0
    });
    
    setShowEditModal(true);
  };

  // 💾 STEP 4: Save all data back to Firebase
  const handleSaveMainDetails = async () => {
    if (!currentEditingCourse) return;
    
    try {
      const courseRef = doc(db, "courses", currentEditingCourse.id);
      
      const dataToUpdate = {
        ...editData,
        updatedAt: new Date().toISOString(),
        // Keep original ID and timestamps
        id: currentEditingCourse.id,
        createdAt: currentEditingCourse.createdAt || new Date().toISOString()
      };
      
      await updateDoc(courseRef, dataToUpdate);
      
      // Update local state
      setCourses(courses.map(course => 
        course.id === currentEditingCourse.id 
          ? { ...course, ...dataToUpdate }
          : course
      ));
      
      setShowEditModal(false);
      setCurrentEditingCourse(null);
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

  // ❌ STEP 5: Cancel editing
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setCurrentEditingCourse(null);
    setEditData({});
  };

  // 🗑️ STEP 6: Delete course
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

  // ⚠️ STEP 7: Delete confirmation
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

  // 📝 STEP 8: Handle input changes in edit form
  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleInstructorChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      instructor: { ...prev.instructor, [field]: value }
    }));
  };

  const handleLearningOutcomeChange = (index, value) => {
    const updatedOutcomes = [...editData.learningOutcomes];
    updatedOutcomes[index] = value;
    setEditData(prev => ({ ...prev, learningOutcomes: updatedOutcomes }));
  };

  const addLearningOutcome = () => {
    setEditData(prev => ({
      ...prev,
      learningOutcomes: [...prev.learningOutcomes, ""]
    }));
  };

  const removeLearningOutcome = (index) => {
    const updatedOutcomes = editData.learningOutcomes.filter((_, i) => i !== index);
    setEditData(prev => ({ ...prev, learningOutcomes: updatedOutcomes }));
  };

  // 🎨 STEP 9: UI helpers
  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 border border-green-200";
      case "Draft": return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Archived": return "bg-gray-100 text-gray-800 border border-gray-200";
      default: return "bg-blue-100 text-blue-800 border border-blue-200";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-blue-100 text-blue-800";
      case "Advanced": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate course progress (for display)
  const calculateProgress = (course) => {
    if (!course.curriculum || !course.curriculum.length) return 0;
    const totalLessons = course.curriculum.reduce((total, section) => 
      total + (section.lessons?.length || 0), 0);
    const completedLessons = course.completedLessons || 0;
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };

  // ⏳ STEP 10: Loading state
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
          <p className="text-gray-600">Manage all courses created through the posting form</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <FiBook className="mr-1" />
            <span>Total: {courses.length} courses | </span>
            <span className="ml-2 text-green-600">
              Active: {courses.filter(c => c.status === "Active").length}
            </span>
            <span className="ml-2 text-blue-600">
              Students: {courses.reduce((total, c) => total + (c.students || 0), 0)}
            </span>
          </div>
        </div>

        {/* Search and Add Button */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by title, category, or instructor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
              />
            </div>
            <button
              onClick={() => navigate("/admin/posting")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center shadow-sm"
            >
              <FiPlus className="mr-2" />
              Create New Course
            </button>
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <FiBookOpen className="w-16 h-16 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-500 mb-1">No courses found</h3>
                        <p className="text-gray-400">
                          {searchTerm ? "Try adjusting your search" : "Create your first course to get started"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50 transition-colors group">
                      {/* Course Title & Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
                            {course.title?.charAt(0) || "C"}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600">
                              {course.title}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 flex items-center">
                              <FiClock className="mr-1" />
                              {course.duration || "No duration"}
                              <span className="mx-2">•</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${getDifficultyColor(course.difficulty)}`}>
                                {course.difficulty || "Beginner"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <FiTag className="mr-2 text-gray-400" />
                          <span className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                            {course.category || "Medical"}
                          </span>
                        </div>
                      </td>

                      {/* Instructor */}
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs mr-2">
                            {course.instructor?.name?.charAt(0) || "I"}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {course.instructor?.title || "Mr."} {course.instructor?.name || "No instructor"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {course.instructor?.numbersofcourses || 0} courses
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <FiDollarSign className="mr-1 text-gray-400" />
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              ${course.price || 0}
                            </div>
                            {course.originalPrice && course.originalPrice > course.price && (
                              <div className="text-xs text-gray-500 line-through">
                                ${course.originalPrice}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
                            {course.status || "Draft"}
                          </span>
                          <div className="text-xs text-gray-500 flex items-center">
                            <FiUsers className="mr-1" />
                            {course.students || 0} students
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          {/* Edit Button */}
                          <button
                            onClick={() => openEditModal(course)}
                            className="text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 p-2 rounded-lg transition-all flex items-center"
                            title="Edit all course details"
                          >
                            <FiEdit className="mr-1" /> Edit
                          </button>
                          
                          {/* View Button */}
                          <button
                            onClick={() => navigate(`/admin/courses/${course.id}`)}
                            className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 p-2 rounded-lg transition-all flex items-center"
                            title="View course details"
                          >
                            <FiEye className="mr-1" /> View
                          </button>
                          
                          {/* Delete Button */}
                          <button
                            onClick={() => showConfirmDialog(course)}
                            disabled={deletingId === course.id}
                            className="text-red-600 hover:text-red-900 hover:bg-red-50 p-2 rounded-lg transition-all flex items-center disabled:opacity-50"
                            title="Delete course"
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
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* BIG Edit Modal - Matches Posting Form Structure */}
        {showEditModal && currentEditingCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Edit Course: {currentEditingCourse.title}</h2>
                    <p className="text-gray-600 mt-1">Update all course details (same as posting form)</p>
                  </div>
                  <button
                    onClick={handleCancelEdit}
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Body - Edit Form (Matching Posting Form) */}
              <div className="p-6">
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FiBook className="mr-2" /> Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Course Title *
                        </label>
                        <input
                          type="text"
                          value={editData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          placeholder="Course Title"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category *
                        </label>
                        <select
                          value={editData.category}
                          onChange={(e) => handleInputChange("category", e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="Medical">Medical</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        value={editData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows="3"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="Course description..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duration *
                        </label>
                        <input
                          type="text"
                          value={editData.duration}
                          onChange={(e) => handleInputChange("duration", e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          placeholder="e.g., 2:00 hr"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Difficulty Level *
                        </label>
                        <select
                          value={editData.difficulty}
                          onChange={(e) => handleInputChange("difficulty", e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FiImage className="inline mr-2" />
                          Image URL *
                        </label>
                        <input
                          type="url"
                          value={editData.image}
                          onChange={(e) => handleInputChange("image", e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          placeholder="https://example.com/image.jpg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FiVideo className="inline mr-2" />
                          Video URL *
                        </label>
                        <input
                          type="url"
                          value={editData.video}
                          onChange={(e) => handleInputChange("video", e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          placeholder="https://example.com/video.jpg"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FiDollarSign className="mr-2" /> Pricing
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Price ($) *
                        </label>
                        <input
                          type="number"
                          value={editData.price}
                          onChange={(e) => handleInputChange("price", parseFloat(e.target.value))}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Original Price ($)
                        </label>
                        <input
                          type="number"
                          value={editData.originalPrice}
                          onChange={(e) => handleInputChange("originalPrice", parseFloat(e.target.value))}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FiUser className="mr-2" /> Instructor Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title
                        </label>
                        <select
                          value={editData.instructor.title}
                          onChange={(e) => handleInstructorChange("title", e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="Mr.">Mr.</option>
                          <option value="Ms.">Ms.</option>
                          <option value="Mrs.">Mrs.</option>
                          <option value="Dr.">Dr.</option>
                          <option value="Prof.">Prof.</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Instructor Name *
                        </label>
                        <input
                          type="text"
                          value={editData.instructor.name}
                          onChange={(e) => handleInstructorChange("name", e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Courses
                        </label>
                        <input
                          type="number"
                          value={editData.instructor.numbersofcourses}
                          onChange={(e) => handleInstructorChange("numbersofcourses", parseInt(e.target.value))}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Avatar URL
                        </label>
                        <input
                          type="url"
                          value={editData.instructor.avatar}
                          onChange={(e) => handleInstructorChange("avatar", e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          placeholder="https://example.com/avatar.jpg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Learning Outcomes */}
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FiTarget className="mr-2" /> Learning Outcomes
                    </h3>
                    <div className="space-y-3">
                      {editData.learningOutcomes?.map((outcome, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={outcome}
                            onChange={(e) => handleLearningOutcomeChange(index, e.target.value)}
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="What will students learn?"
                            required
                          />
                          {editData.learningOutcomes.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeLearningOutcome(index)}
                              className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addLearningOutcome}
                        className="mt-3 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
                      >
                        + Add Learning Outcome
                      </button>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Status</h3>
                    <div className="flex space-x-4">
                      {["Active", "Draft", "Archived"].map((status) => (
                        <label key={status} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="status"
                            value={status}
                            checked={editData.status === status}
                            onChange={(e) => handleInputChange("status", e.target.value)}
                            className="mr-2"
                          />
                          <span className={`px-4 py-2 rounded-full ${getStatusColor(status)}`}>
                            {status}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveMainDetails}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center"
                  >
                    <FiSave className="mr-2" />
                    Save All Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notifications */}
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