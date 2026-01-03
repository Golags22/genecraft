import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../database/firebase";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddResource() {
  const [form, setForm] = useState({
    title: "",
    type: "Documents",
    size: "",
    author: "",
    description: "",
    fileUrl: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "resources"), {
        ...form,
        downloads: 0,
        status: "Draft",
        uploadDate: new Date().toLocaleDateString(),
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      });

      toast.success("Resource uploaded successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Navigate after a short delay to show the success message
      setTimeout(() => {
        navigate("/admin/resources");
      }, 2000);

    } catch (error) {
      console.error("Error adding resource:", error);
      toast.error("Failed to upload resource. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const resourceTypes = [
    "Documents", "Videos", "Templates", "Guides", "Code", 
    "Worksheets", "Presentations", "E-books", "Audio", "Images"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      
      {/* Mobile Navigation Toggle (if needed) */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => {/* Add mobile sidebar toggle logic here */}}
          className="p-2 bg-white rounded-lg shadow-md"
        >
          ☰
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Hidden on mobile, shown on large screens */}
        <div className="hidden lg:block lg:w-64">
          <Sidebar />
        </div>

        {/* Mobile Sidebar (if you want it collapsible) */}
        {/* <div className="lg:hidden">
          <Sidebar />
        </div> */}

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:ml-0 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Upload New Resource
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Add a new learning resource to your collection
              </p>
            </div>

            {/* Form Container */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 sm:p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Title - Full width on mobile, 2 cols on desktop */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resource Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        placeholder="e.g., Advanced React Patterns Guide"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        required
                      />
                    </div>

                    {/* Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resource Type *
                      </label>
                      <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      >
                        {resourceTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    {/* Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        File Size *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="size"
                          placeholder="e.g., 2.3 MB"
                          value={form.size}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                          required
                        />
                      </div>
                    </div>

                    {/* Author */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Author *
                      </label>
                      <input
                        type="text"
                        name="author"
                        placeholder="Author name"
                        value={form.author}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        required
                      />
                    </div>

                    {/* File URL - Full width on mobile, 2 cols on desktop */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        File URL *
                      </label>
                      <input
                        type="url"
                        name="fileUrl"
                        placeholder="https://example.com/resource.pdf"
                        value={form.fileUrl}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        required
                      />
                    </div>

                    {/* Description - Full width on all screens */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        placeholder="Brief description of the resource..."
                        value={form.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 sm:pt-6 border-t border-gray-200">
                    <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
                      <button
                        type="button"
                        onClick={() => navigate("/admin/resources")}
                        className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 text-sm sm:text-base"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-4 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading...
                          </>
                        ) : (
                          "Upload Resource"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="mt-6 sm:mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
              <h3 className="font-semibold text-blue-800 mb-2 sm:mb-3 text-sm sm:text-base">
                📝 Upload Tips
              </h3>
              <ul className="text-xs sm:text-sm text-blue-700 space-y-1.5 sm:space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Ensure the resource title is clear and descriptive</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Include the correct file size for user reference</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Provide a valid URL where the resource can be accessed</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Add a helpful description to guide users</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Resources will be saved as "Draft" initially</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}