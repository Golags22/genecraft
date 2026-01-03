import { useState, useEffect } from "react";
import { FaBook, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../database/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function StudentDashboard() {
  const [active, setActive] = useState("Dashboard");
  const [userData, setUserData] = useState(null);
  const [originalUserData, setOriginalUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to get initials from name
  const getInitials = (name) => {
    if (!name) return "S";
    
    const names = name.split(" ");
    let initials = names[0].charAt(0).toUpperCase();
    
    if (names.length > 1) {
      initials += names[names.length - 1].charAt(0).toUpperCase();
    }
    
    return initials;
  };

  // Function to generate a consistent color based on user ID or name
  const getAvatarColor = (id) => {
    if (!id) return "bg-blue-600";
    
    const colors = [
      "bg-blue-600", "bg-green-600", "bg-purple-600", 
      "bg-red-600", "bg-yellow-600", "bg-pink-600",
      "bg-indigo-600", "bg-teal-600", "bg-orange-600"
    ];
    
    // Simple hash function to get consistent color for each user
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  // Fetch user data when component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserData(user.uid);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchUserData = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = {
          id: userDoc.id,
          ...userDoc.data()
        };
        setUserData(data);
        setOriginalUserData(data);
      } else {
        const currentUser = auth.currentUser;
        const data = {
          uid: userId,
          email: currentUser?.email || "",
          displayName: currentUser?.displayName || "Student"
        };
        setUserData(data);
        setOriginalUserData(data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (!auth.currentUser) {
        alert("You must be logged in to save changes");
        return;
      }

      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        fullName: userData.fullName || "",
        username: userData.username || "",
        bio: userData.bio || "",
        lastUpdated: new Date()
      });
      
      alert("Profile updated successfully!");
      setOriginalUserData({...userData});
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleCancelChanges = () => {
    setUserData({...originalUserData});
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaBook />, action: () => setActive("Dashboard") },
    { name: "Profile", icon: <FaUser />, action: () => setActive("Profile") },
    { name: "Settings", icon: <FaCog />, action: () => setActive("Settings") },
    { name: "Logout", icon: <FaSignOutAlt />, action: handleLogout },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  // Get user initials and color for avatar
  const userName = userData?.fullName || userData?.username || userData?.email?.split('@')[0] || "Student";
  const userInitials = getInitials(userName);
  const avatarColor = getAvatarColor(userData?.uid || userName);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col">
        <div className="p-6 font-bold text-2xl border-b border-blue-500">
          Student Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={item.action}
              className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
                active === item.name
                  ? "bg-white text-blue-600 font-semibold"
                  : "hover:bg-blue-500"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {active}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              Hi, {userName} 👋
            </span>
            {/* Avatar with initials */}
            <div className={`${avatarColor} w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-lg`}>
              {userInitials}
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {active === "Dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h2 className="text-lg font-bold text-gray-700">My Courses</h2>
              <p className="mt-2 text-gray-500">
                {userData?.coursesEnrolled?.length 
                  ? `You're enrolled in ${userData.coursesEnrolled.length} courses` 
                  : "No courses enrolled yet"}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h2 className="text-lg font-bold text-gray-700">Progress</h2>
              <p className="mt-2 text-gray-500">
                Overall: {userData?.progress?.overall || 0}% Completed
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h2 className="text-lg font-bold text-gray-700">Certificates</h2>
              <p className="mt-2 text-gray-500">
                {userData?.progress?.completedCourses || 0} Certificates Earned
              </p>
            </div>
          </div>
        )}

        {active === "Profile" && userData && (
          <div className="bg-white p-6 rounded-xl shadow max-w-md">
            <div className="flex items-center mb-6">
              {/* Profile Avatar with initials */}
              <div className={`${avatarColor} w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-4`}>
                {userInitials}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{userName}</h2>
                <p className="text-gray-600">{userData.role || "student"}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{userData.fullName || "Not set"}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="font-medium">{userData.username || "Not set"}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{userData.email || "Not set"}</p>
              </div>
              
              {userData.bio && (
                <div>
                  <p className="text-sm text-gray-500">Bio</p>
                  <p className="font-medium">{userData.bio}</p>
                </div>
              )}
              
              {userData.createdAt && (
                <div>
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="font-medium">
                    {new Date(userData.createdAt.toDate()).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {active === "Settings" && userData && (
          <div className="bg-white p-6 rounded-xl shadow max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
            
            <div className="space-y-6">
              {/* Profile Avatar Preview */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Profile Avatar</h3>
                <div className="flex items-center space-x-6">
                  <div className={`${avatarColor} w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-4xl border-4 border-gray-200`}>
                    {userInitials}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Your avatar is automatically generated from your name initials
                    </p>
                    <p className="text-sm text-gray-500">
                      Color: Based on your user ID
                    </p>
                    <p className="text-sm text-gray-500">
                      Initials: {userInitials}
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Information Section */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name - Editable */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={userData.fullName || ""}
                      onChange={(e) => setUserData({...userData, fullName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Enter your full name"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This will update your avatar initials
                    </p>
                  </div>

                  {/* Username - Editable */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      value={userData.username || ""}
                      onChange={(e) => setUserData({...userData, username: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Choose a username"
                    />
                  </div>

                  {/* Email - Locked */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={userData.email || ""}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                        placeholder="Your email address"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          Locked
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Email cannot be changed. Contact support for assistance.
                    </p>
                  </div>

                  {/* Bio - Editable */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={userData.bio || ""}
                      onChange={(e) => setUserData({...userData, bio: e.target.value})}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                      placeholder="Tell us about yourself..."
                      maxLength="200"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      A brief description about yourself (max 200 characters)
                    </p>
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Notification Preferences</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      defaultChecked
                    />
                    <span className="text-gray-700">Email notifications for new courses</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      defaultChecked
                    />
                    <span className="text-gray-700">Course completion alerts</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Marketing and promotional emails</span>
                  </label>
                </div>
              </div>

              {/* Save/Cancel Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  onClick={handleCancelChanges}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}