import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { db } from "../../../database/firebase";
import { doc, getDoc } from "firebase/firestore";
import Sidebar from "./Sidebar";
import { 
  FiArrowLeft, 
  FiEdit, 
  FiDownload, 
  FiCalendar, 
  FiUser, 
  FiFile, 
  FiBarChart2, 
  FiType,
  FiFilm,
  FiBook,
  FiCode,
  FiCheckCircle,
  FiClock,
  FiArchive
} from "react-icons/fi";

export default function ViewResource() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const docRef = doc(db, "resources", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setResource({ id: snap.id, ...snap.data() });
        }
      } catch (error) {
        console.error("Error fetching resource:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResource();
  }, [id]);

  const getTypeIcon = (type) => {
    switch(type) {
      case "Videos": return <FiFilm className="text-red-500" />;
      case "Templates": return <FiFile className="text-blue-500" />;
      case "Guides": return <FiBook className="text-green-500" />;
      case "Code": return <FiCode className="text-purple-500" />;
      default: return <FiType className="text-indigo-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "Published":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <FiCheckCircle className="mr-1" /> Published
        </span>;
      case "Draft":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <FiClock className="mr-1" /> Draft
        </span>;
      case "Archived":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <FiArchive className="mr-1" /> Archived
        </span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {status}
        </span>;
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

  if (!resource) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-0 lg:ml-64 p-6 flex flex-col items-center justify-center">
          <div className="text-center">
            <FiFile className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Resource not found</h3>
            <p className="mt-1 text-sm text-gray-500">The resource you're looking for doesn't exist.</p>
            <div className="mt-6">
              <button
                onClick={() => navigate("/admin/resources")}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiArrowLeft className="mr-2" /> Back to Resources
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
      
      <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300 ease-in-out">
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <button 
                onClick={() => navigate("/admin/resources")}
                className="flex items-center text-gray-600 hover:text-indigo-600 mr-4"
              >
                <FiArrowLeft className="mr-2" /> Back to Resources
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Resource Details</h1>
            </div>
            
            <Link
              to={`/admin/resources/edit/${resource.id}`}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FiEdit className="mr-2" /> Edit Resource
            </Link>
          </div>

          {/* Resource Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center">
              <div className="p-3 rounded-lg bg-indigo-50 mr-4">
                {getTypeIcon(resource.type)}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{resource.title}</h2>
                <div className="flex items-center mt-1">
                  {getStatusBadge(resource.status)}
                  <span className="ml-3 text-sm text-gray-500">{resource.type}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Author</p>
                      <p className="text-sm text-gray-900">{resource.author}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiBarChart2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Size</p>
                      <p className="text-sm text-gray-900">{resource.size}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiDownload className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Downloads</p>
                      <p className="text-sm text-gray-900">{resource.downloads || 0}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCalendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Upload Date</p>
                      <p className="text-sm text-gray-900">
                        {resource.uploadDate || "Not specified"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiFile className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Resource Type</p>
                      <p className="text-sm text-gray-900">{resource.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheckCircle className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <div className="mt-1">
                        {getStatusBadge(resource.status)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Description Section (if available) */}
            {resource.description && (
              <div className="px-6 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-md">
                  {resource.description}
                </p>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => navigate("/admin/resources")}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}