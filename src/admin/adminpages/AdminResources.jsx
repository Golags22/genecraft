import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../database/firebase";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiFileText,
  FiFilm,
  FiBook,
  FiCode,
  FiLayers,
  FiDownload,
  FiCalendar,
  FiUser,
  FiCheckSquare,
  FiSquare
} from "react-icons/fi";

export default function AdminResources() {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedResources, setSelectedResources] = useState([]);
  const [categories] = useState([
    "All",
    "Documents",
    "Videos",
    "Templates",
    "Guides",
    "Code",
  ]);

  // 🔹 Fetch resources from Firestore
  const fetchResources = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "resources"));
      const resourcesData = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setResources(resourcesData);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // 🔹 Filtering logic
  const filteredResources = resources.filter(
    (resource) =>
      (resource.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.type?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCategory === "all" || resource.type?.toLowerCase() === filterCategory)
  );

  const toggleResourceSelection = (id) => {
    setSelectedResources((prev) =>
      prev.includes(id)
        ? prev.filter((resourceId) => resourceId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedResources.length === filteredResources.length) {
      setSelectedResources([]);
    } else {
      setSelectedResources(filteredResources.map((resource) => resource.id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Documents":
        return <FiFileText className="text-blue-500" />;
      case "Videos":
        return <FiFilm className="text-red-500" />;
      case "Templates":
        return <FiLayers className="text-purple-500" />;
      case "Guides":
        return <FiBook className="text-green-500" />;
      case "Code":
        return <FiCode className="text-indigo-500" />;
      default:
        return <FiFileText className="text-gray-500" />;
    }
  };

  const formatFileSize = (size) => size;

  // Loading state
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

      <div className="flex-1 ml-0 lg:ml-64 p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Resource Management</h1>
          <p className="text-gray-600">Manage and organize all learning resources</p>
        </div>

        {/* Controls Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
              </div>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <Link 
              to="/admin/resources/add"
              className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <FiPlus className="mr-2" />
              Upload Resource
            </Link>
          </div>
        </div>

        {/* Resources Table Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center">
              <button 
                onClick={toggleSelectAll}
                className="mr-4 text-gray-400 hover:text-indigo-600"
              >
                {selectedResources.length === filteredResources.length && filteredResources.length > 0 ? (
                  <FiCheckSquare className="w-5 h-5" />
                ) : (
                  <FiSquare className="w-5 h-5" />
                )}
              </button>
              <span className="text-sm text-gray-600">
                {selectedResources.length} of {filteredResources.length} selected
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                    {/* Checkbox column header */}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resource
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Downloads
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredResources.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <FiFileText className="w-12 h-12 text-gray-300 mb-3" />
                        <h3 className="text-lg font-medium text-gray-500">No resources found</h3>
                        <p className="text-gray-400 mt-1">
                          {searchTerm || filterCategory !== "all" 
                            ? "Try adjusting your search or filter criteria" 
                            : "Get started by uploading your first resource"
                          }
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredResources.map((resource) => (
                    <tr key={resource.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedResources.includes(resource.id)}
                          onChange={() => toggleResourceSelection(resource.id)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                            {getTypeIcon(resource.type)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {resource.title}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <FiUser className="mr-1 w-3 h-3" />
                              {resource.author}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {resource.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatFileSize(resource.size)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <FiDownload className="mr-1 text-gray-400" />
                          {resource.downloads || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            resource.status
                          )}`}
                        >
                          {resource.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <FiCalendar className="mr-1 text-gray-400" />
                          {resource.uploadDate || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/admin/resources/edit/${resource.id}`}
                            className="text-indigo-600 hover:text-indigo-900 flex items-center"
                          >
                            <FiEdit className="mr-1" /> Edit
                          </Link>
                          <Link
                            to={`/admin/resources/delete/${resource.id}`}
                            className="text-red-600 hover:text-red-900 flex items-center"
                          >
                            <FiTrash2 className="mr-1" /> Delete
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Showing {filteredResources.length} of {resources.length} resources
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}