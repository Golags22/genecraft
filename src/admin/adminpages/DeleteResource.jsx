import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../database/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import Sidebar from "./Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  FiTrash2, 
  FiArrowLeft, 
  FiAlertTriangle, 
  FiFileText, 
  FiUser, 
  FiBarChart2,
  FiXCircle,
  FiCheckCircle
} from "react-icons/fi";

export default function DeleteResource() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const docRef = doc(db, "resources", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setResource({ id: snap.id, ...snap.data() });
        } else {
          toast.error("Resource not found", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setTimeout(() => navigate("/admin/resources"), 2000);
        }
      } catch (error) {
        console.error("Error fetching resource:", error);
        toast.error("Failed to load resource", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };
    fetchResource();
  }, [id, navigate]);

  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      await deleteDoc(doc(db, "resources", id));
      
      toast.success("Resource deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      setTimeout(() => navigate("/admin/resources"), 1500);
    } catch (error) {
      console.error("Error deleting:", error);
      setIsDeleting(false);
      
      toast.error("Failed to delete resource. Please try again.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const showConfirmDialog = () => {
    toast.info(
      <div className="p-2">
        <div className="flex items-center mb-3">
          <FiAlertTriangle className="text-red-500 mr-2 text-xl" />
          <h3 className="font-semibold">Confirm Deletion</h3>
        </div>
        <p className="text-sm mb-4">Are you sure you want to delete "{resource?.title}"? This action cannot be undone.</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              toast.dismiss();
              handleDelete();
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

  if (!resource) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-0 lg:ml-64 p-6 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-gray-200 h-12 w-12 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-40"></div>
          </div>
        </div>
        <ToastContainer />
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
            <h1 className="text-2xl font-bold text-gray-800">Delete Resource</h1>
          </div>

          {/* Warning Card */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6 flex items-start">
            <FiAlertTriangle className="text-red-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-red-800 font-medium">Warning: Destructive Action</h3>
              <p className="text-red-700 text-sm mt-1">
                This action will permanently delete the resource from the database. This cannot be undone.
              </p>
            </div>
          </div>

          {/* Resource Details Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-100 bg-red-50">
              <h2 className="text-lg font-medium text-red-700 flex items-center">
                <FiTrash2 className="mr-2" /> Resource to be deleted
              </h2>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-red-100 text-red-600 mr-4">
                  <FiFileText className="text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{resource.title}</h3>
                  <p className="text-sm text-gray-500">{resource.type}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <FiUser className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Author</p>
                    <p className="text-gray-900">{resource.author}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FiBarChart2 className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Size</p>
                    <p className="text-gray-900">{resource.size}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="mr-3 w-5 h-5 flex items-center justify-center">
                    {resource.status === "Published" ? (
                      <FiCheckCircle className="text-green-500" />
                    ) : resource.status === "Draft" ? (
                      <FiAlertTriangle className="text-yellow-500" />
                    ) : (
                      <FiXCircle className="text-gray-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="text-gray-900">{resource.status}</p>
                  </div>
                </div>
                
                {resource.uploadDate && (
                  <div className="flex items-center">
                    <FiBarChart2 className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Upload Date</p>
                      <p className="text-gray-900">{resource.uploadDate}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={showConfirmDialog}
                  disabled={isDeleting}
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-75 transition-colors"
                >
                  {isDeleting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <FiTrash2 className="mr-2" /> Delete Resource
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => navigate("/admin/resources")}
                  disabled={isDeleting}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
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
  );
}