import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../database/firebase";
import Sidebar from "./Sidebar";
import { 
  FiArrowLeft, FiSave, FiEdit, FiUsers, FiCalendar, FiBarChart2, 
  FiBook, FiDollarSign, FiClock, FiTag, FiGlobe, FiVideo, 
  FiImage, FiUser, FiTarget, FiBookOpen, FiX, FiCheck, FiPlus
} from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [activeTab, setActiveTab] = useState("overview");

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
        setEditData({
          // Basic Info
          title: courseData.title || "",
          description: courseData.description || "",
          category: courseData.category || "Medical",
          duration: courseData.duration || "",
          difficulty: courseData.difficulty || "Beginner",
          image: courseData.image || "",
          video: courseData.video || "",
          
          // Pricing
          price: courseData.price || 0,
          originalPrice: courseData.originalPrice || 0,
          
          // Instructor
          instructor: {
            title: courseData.instructor?.title || "Mr.",
            name: courseData.instructor?.name || "",
            numbersofcourses: courseData.instructor?.numbersofcourses || 0,
            avatar: courseData.instructor?.avatar || ""
          },
          
          // Content
          learningOutcomes: courseData.learningOutcomes?.length > 0 
            ? [...courseData.learningOutcomes] 
            : [""],
          
          // Curriculum
          curriculum: courseData.curriculum?.length > 0 
            ? [...courseData.curriculum] 
            : [{
                sectionTitle: "",
                lessons: [{ id: 1, title: "", duration: "" }]
              }],
          
          // Additional
          status: courseData.status || "Draft",
          language: courseData.language || "English",
          students: courseData.students || 0,
          rating: courseData.rating || 0,
          reviews: courseData.reviews || 0,
          progress: courseData.progress || 0
        });
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      toast.error("Failed to load course", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const courseRef = doc(db, "courses", id);
      const dataToUpdate = {
        ...editData,
        updatedAt: new Date().toISOString()
      };
      
      await updateDoc(courseRef, dataToUpdate);
      setCourse(prev => ({ ...prev, ...dataToUpdate }));
      setIsEditing(false);
      
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
    setIsEditing(false);
    setEditData({
      ...course,
      instructor: course.instructor || { title: "Mr.", name: "", numbersofcourses: 0, avatar: "" },
      learningOutcomes: course.learningOutcomes || [""],
      curriculum: course.curriculum || [{ sectionTitle: "", lessons: [{ id: 1, title: "", duration: "" }] }]
    });
  };

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
    if (editData.learningOutcomes.length > 1) {
      const updatedOutcomes = editData.learningOutcomes.filter((_, i) => i !== index);
      setEditData(prev => ({ ...prev, learningOutcomes: updatedOutcomes }));
    }
  };

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

  // Tabs for different sections
  const tabs = [
    { id: "overview", label: "Overview", icon: <FiBook /> },
    { id: "content", label: "Content", icon: <FiBookOpen /> },
    { id: "instructor", label: "Instructor", icon: <FiUser /> },
    { id: "curriculum", label: "Curriculum", icon: <FiTarget /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-0 lg:ml-64">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/admin/coursetable")}
                className="flex items-center text-gray-600 hover:text-indigo-600 mr-6 transition-colors"
              >
                <FiArrowLeft className="mr-2" /> Back to Courses
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{course.title}</h1>
                <p className="text-gray-600 text-sm">Course ID: {course.id}</p>
              </div>
            </div>
            {isEditing ? (
              <div className="flex space-x-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                >
                  <FiX className="mr-2" /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-600 to-teal-500 text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center"
                >
                  <FiSave className="mr-2" /> Save Changes
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center shadow-sm"
              >
                <FiEdit className="mr-2" /> Edit Course
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Course Hero Card */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="md:flex">
                  {/* Course Image */}
                  <div className="md:w-1/3 relative">
                    {isEditing ? (
                      <div className="p-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FiImage className="inline mr-2" />
                          Course Image URL
                        </label>
                        <input
                          type="url"
                          value={editData.image}
                          onChange={(e) => handleInputChange("image", e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    ) : course.image ? (
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 md:h-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">
                          {course.title?.charAt(0) || "C"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Course Info */}
                  <div className="md:w-2/3 p-6">
                    {isEditing ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          className="text-2xl font-bold text-gray-800 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          placeholder="Course Title"
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                              value={editData.category}
                              onChange={(e) => handleInputChange("category", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            >
                              <option value="Medical">Medical</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                            <select
                              value={editData.difficulty}
                              onChange={(e) => handleInputChange("difficulty", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                            <input
                              type="text"
                              value={editData.duration}
                              onChange={(e) => handleInputChange("duration", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                              placeholder="e.g., 2:00 hr"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">{course.title}</h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className={`px-3 py-1 rounded-full ${getDifficultyColor(course.difficulty)}`}>
                            {course.difficulty || "Beginner"}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full flex items-center">
                            <FiTag className="mr-1" /> {course.category || "Medical"}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full flex items-center">
                            <FiClock className="mr-1" /> {course.duration || "No duration"}
                          </span>
                        </div>
                      </>
                    )}

                    {/* Description */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      {isEditing ? (
                        <textarea
                          value={editData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          rows="3"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          placeholder="Course description..."
                        />
                      ) : (
                        <p className="text-gray-600">{course.description}</p>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center text-gray-500 mb-1">
                          <FiUsers className="mr-2" />
                          <span className="text-sm">Students</span>
                        </div>
                        <p className="text-xl font-bold text-gray-800">{course.students || 0}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center text-gray-500 mb-1">
                          <FiBarChart2 className="mr-2" />
                          <span className="text-sm">Status</span>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
                          {course.status || "Draft"}
                        </span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center text-gray-500 mb-1">
                          <FiDollarSign className="mr-2" />
                          <span className="text-sm">Price</span>
                        </div>
                        <p className="text-xl font-bold text-gray-800">${course.price || 0}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center text-gray-500 mb-1">
                          <FiCalendar className="mr-2" />
                          <span className="text-sm">Created</span>
                        </div>
                        <p className="text-sm text-gray-800">
                          {course.createdAt ? new Date(course.createdAt).toLocaleDateString() : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Preview */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiVideo className="mr-2" /> Course Preview
                </h3>
                {isEditing ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Video URL
                    </label>
                    <input
                      type="url"
                      value={editData.video}
                      onChange={(e) => handleInputChange("video", e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="https://example.com/video.jpg"
                    />
                  </div>
                ) : course.video ? (
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    {/* Video player would go here */}
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-white text-4xl mb-2">🎬</div>
                        <p className="text-gray-300">Video Preview: {course.video}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">No video preview available</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className="space-y-6">
              {/* Learning Outcomes */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiTarget className="mr-2" /> What Students Will Learn
                </h3>
                {isEditing ? (
                  <div className="space-y-3">
                    {editData.learningOutcomes?.map((outcome, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <FiCheck className="text-green-500 mt-1 flex-shrink-0" />
                        <div className="flex-1 flex items-center space-x-2">
                          <input
                            type="text"
                            value={outcome}
                            onChange={(e) => handleLearningOutcomeChange(index, e.target.value)}
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="What will students learn?"
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
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addLearningOutcome}
                      className="mt-3 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors flex items-center"
                    >
                      <FiPlus className="mr-2" /> Add Learning Outcome
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {course.learningOutcomes?.map((outcome, index) => (
                      <div key={index} className="flex items-start">
                        <FiCheck className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <p className="text-gray-700">{outcome}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pricing Details */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiDollarSign className="mr-2" /> Pricing Information
                </h3>
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Price ($)
                      </label>
                      <input
                        type="number"
                        value={editData.price}
                        onChange={(e) => handleInputChange("price", parseFloat(e.target.value))}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        min="0"
                        step="0.01"
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
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Current Price</p>
                        <p className="text-2xl font-bold text-gray-800">${course.price || 0}</p>
                      </div>
                      {course.originalPrice && course.originalPrice > course.price && (
                        <div className="text-right">
                          <p className="text-sm text-gray-600 line-through">Original Price</p>
                          <p className="text-lg text-gray-500 line-through">${course.originalPrice}</p>
                          <p className="text-sm text-green-600 font-medium">
                            Save ${(course.originalPrice - course.price).toFixed(2)} (
                            {Math.round((1 - course.price / course.originalPrice) * 100)}% off)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "instructor" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Instructor Profile</h3>
              {isEditing ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={editData.instructor.name}
                        onChange={(e) => handleInstructorChange("name", e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="Instructor name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number of Courses</label>
                      <input
                        type="number"
                        value={editData.instructor.numbersofcourses}
                        onChange={(e) => handleInstructorChange("numbersofcourses", parseInt(e.target.value))}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label>
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
              ) : (
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {course.instructor?.avatar ? (
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="h-32 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                        {course.instructor?.name?.charAt(0) || "I"}
                      </div>
                    )}
                  </div>

                  {/* Instructor Info */}
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800">
                      {course.instructor?.title || "Mr."} {course.instructor?.name || "No Instructor"}
                    </h4>
                    <div className="mt-2 flex items-center text-gray-600">
                      <FiBook className="mr-2" />
                      <span>{course.instructor?.numbersofcourses || 0} courses created</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "curriculum" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Course Curriculum</h3>
              {isEditing ? (
                <div className="space-y-6">
                  {editData.curriculum?.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-3">Section {sectionIndex + 1}</h4>
                      <input
                        type="text"
                        value={section.sectionTitle}
                        onChange={(e) => {
                          const updatedCurriculum = [...editData.curriculum];
                          updatedCurriculum[sectionIndex].sectionTitle = e.target.value;
                          handleInputChange("curriculum", updatedCurriculum);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
                        placeholder="Section title"
                      />
                      
                      <div className="space-y-2">
                        {section.lessons?.map((lesson, lessonIndex) => (
                          <div key={lesson.id} className="flex items-center space-x-2">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={lesson.title}
                                onChange={(e) => {
                                  const updatedCurriculum = [...editData.curriculum];
                                  updatedCurriculum[sectionIndex].lessons[lessonIndex].title = e.target.value;
                                  handleInputChange("curriculum", updatedCurriculum);
                                }}
                                className="px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="Lesson title"
                              />
                              <input
                                type="text"
                                value={lesson.duration}
                                onChange={(e) => {
                                  const updatedCurriculum = [...editData.curriculum];
                                  updatedCurriculum[sectionIndex].lessons[lessonIndex].duration = e.target.value;
                                  handleInputChange("curriculum", updatedCurriculum);
                                }}
                                className="px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="Duration"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {course.curriculum?.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h4 className="font-medium text-gray-800">
                          Section {sectionIndex + 1}: {section.sectionTitle || "Untitled Section"}
                        </h4>
                      </div>
                      <div className="p-4">
                        <div className="space-y-3">
                          {section.lessons?.map((lesson) => (
                            <div key={lesson.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center">
                                <div className="h-8 w-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-3">
                                  {lesson.id}
                                </div>
                                <span className="text-gray-700">{lesson.title}</span>
                              </div>
                              <span className="text-gray-500 text-sm">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
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