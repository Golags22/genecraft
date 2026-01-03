import { useEffect, useState } from "react";
import { db } from "../../../database/firebase";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { 
  FiMail, FiUser, FiShield, FiEdit, FiSave, FiX, FiLock, 
  FiPhone, FiMapPin, FiCalendar, FiGlobe, FiUpload,
  FiCamera, FiBriefcase, FiStar, FiCheck
} from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    setIsLoading(true);
    try {
      // Query the user with role = "admin"
      const q = query(collection(db, "users"), where("role", "==", "admin"));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const adminDoc = querySnapshot.docs[0];
        const adminData = { id: adminDoc.id, ...adminDoc.data() };
        setAdmin(adminData);
        setEditData(adminData);
      } else {
        toast.error("No admin profile found", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      toast.error("Failed to load admin profile", { autoClose: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      if (!admin || !admin.id) {
        toast.error("Admin profile not found");
        return;
      }

      const adminRef = doc(db, "users", admin.id);
      
      // Prepare data for update
      const updatedData = {
        ...editData,
        updatedAt: new Date().toISOString(),
        lastUpdatedBy: admin.email // Track who made the update
      };

      await updateDoc(adminRef, updatedData);
      
      // Update local state
      setAdmin(prev => ({ ...prev, ...updatedData }));
      setIsEditing(false);
      
      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error updating admin profile:", error);
      toast.error("Failed to update profile: " + error.message, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(admin);
  };

 
  const handleAvatarUpload = () => {
    // This is a simplified version - in production, you'd upload to Firebase Storage
    const avatarUrl = prompt("Enter avatar image URL:");
    if (avatarUrl) {
      handleInputChange("avatar", avatarUrl);
      toast.info("Avatar URL updated. Click Save to confirm.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="relative">
          {editData.avatar ? (
            <img 
              src={editData.avatar} 
              alt="Admin Avatar" 
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
              {editData.fullName?.charAt(0) || "A"}
            </div>
          )}
          {isEditing && (
            <button
              onClick={handleAvatarUpload}
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              title="Change avatar"
            >
              <FiCamera className="text-indigo-600" />
            </button>
          )}
        </div>
        
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={editData.fullName || ""}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={editData.username || ""}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter username"
                />
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{admin.fullName}</h3>
              <p className="text-gray-500">@{admin.username}</p>
              <div className="flex items-center mt-2">
                <FiShield className="text-green-500 mr-2" />
                <span className="text-sm text-gray-600">Administrator</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FiMail className="inline mr-2" />
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                value={editData.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="admin@example.com"
              />
            ) : (
              <p className="text-gray-800">{admin.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FiPhone className="inline mr-2" />
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={editData.phone || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="+1 (555) 000-0000"
              />
            ) : (
              <p className="text-gray-800">{admin.phone || "Not provided"}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FiMapPin className="inline mr-2" />
              Location
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editData.location || ""}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="City, Country"
              />
            ) : (
              <p className="text-gray-800">{admin.location || "Not specified"}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Bio</h4>
        {isEditing ? (
          <textarea
            value={editData.bio || ""}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="Tell us about yourself..."
          />
        ) : (
          <p className="text-gray-700">{admin.bio || "No bio provided."}</p>
        )}
      </div>
    </div>
  );



  const tabs = [
    { id: "profile", label: "Profile", icon: <FiUser /> },
  ];

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Loading Admin Profile...</h2>
            <p className="text-gray-500">Please wait while we fetch your details</p>
          </div>
        </div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Admin Profile</h2>
        <p className="text-gray-500">No admin data available. Please check your database.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      {/* Header with Edit Button */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Profile</h2>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>
        
        {isEditing ? (
          <div className="flex space-x-3">
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            >
              <FiX className="mr-2" /> Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" /> Save Changes
                </>
              )}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center"
          >
            <FiEdit className="mr-2" /> Edit Profile
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
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

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "profile" && renderProfileTab()}
        {activeTab === "account" && renderAccountTab()}
        {activeTab === "preferences" && renderPreferencesTab()}
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