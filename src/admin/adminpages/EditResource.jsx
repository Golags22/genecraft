import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../database/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Sidebar from "./Sidebar";
import { FiArrowLeft, FiSave, FiAlertCircle, FiCheckCircle, FiDownload, FiUser, FiType, FiBarChart2, FiFileText } from "react-icons/fi";

export default function EditResource() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    type: "Documents",
    size: "",
    author: "",
    status: "Draft"
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const docRef = doc(db, "resources", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setForm(snap.data());
        } else {
          setError("Resource not found");
        }
      } catch (error) {
        console.error("Error fetching resource:", error);
        setError("Failed to load resource");
      } finally {
        setIsLoading(false);
      }
    };
    fetchResource();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    if (error) setError("");
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);
    
    try {
      await updateDoc(doc(db, "resources", id), form);
      setSuccess(true);
      setTimeout(() => {
        navigate("/admin/resources");
      }, 1500);
    } catch (error) {
      console.error("Error updating:", error);
      setError("Failed to update resource. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case "Videos": return <FiDownload className="text-red-500" />;
      case "Templates": return <FiFileText className="text-blue-500" />;
      case "Guides": return <FiBarChart2 className="text-green-500" />;
      case "Code": return <FiType className="text-purple-500" />;
      default: return <FiFileText className="text-indigo-500" />;
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
               <h3 className="text-lg font-medium text-gray-700">Loading Resources</h3>
               <p className="text-gray-500 mt-1">Please wait while we fetch your resources...</p>
             </div>
           </div>
         </div>
       </div>
     );
   }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300 ease-in-out">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigate("/admin/resources")}
              className="flex items-center text-gray-600 hover:text-indigo-600 mr-4"
            >
              <FiArrowLeft className="mr-2" /> Back to Resources
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Edit Resource</h1>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-center">
              <FiAlertCircle className="text-red-500 mr-3" />
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md flex items-center">
              <FiCheckCircle className="text-green-500 mr-3" />
              <p className="text-green-700">Resource updated successfully! Redirecting...</p>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-800">Resource Details</h2>
              <p className="text-sm text-gray-500">Update the information for this resource</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title Field */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="Enter resource title"
                    required
                  />
                </div>

                {/* Type Field */}
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {getTypeIcon(form.type)}
                    </div>
                    <select
                      id="type"
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none transition-colors"
                    >
                      <option value="Documents">Documents</option>
                      <option value="Videos">Videos</option>
                      <option value="Templates">Templates</option>
                      <option value="Guides">Guides</option>
                      <option value="Code">Code</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Size Field */}
                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                    Size
                  </label>
                  <input
                    type="text"
                    id="size"
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="e.g., 5 MB, 15 pages"
                    required
                  />
                </div>

                {/* Author Field */}
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={form.author}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      placeholder="Author name"
                      required
                    />
                  </div>
                </div>

                {/* Status Field */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none transition-colors"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/admin/resources")}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75 transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      <FiSave className="mr-2" />
                      Update Resource
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}