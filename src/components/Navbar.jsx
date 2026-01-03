import { Link, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../database/firebase"; // Adjust path based on your firebase config
import { FaUser, FaSignOutAlt, FaHome, FaBook, FaImages, FaAddressBook, FaInfoCircle, FaTachometerAlt } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMobile, setShowMobile] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      // Fetch additional user data from Firestore if user exists
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserData({ id: userDoc.id, ...userDoc.data() });
          } else {
            // If user document doesn't exist, set basic user data
            setUserData({
              id: currentUser.uid,
              name: currentUser.displayName || currentUser.email?.split("@")[0] || "User",
              email: currentUser.email,
              profilePicture: currentUser.photoURL
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  function toggleNav() {
    setShowMobile(prev => !prev);
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
      navigate("/"); // Navigates to home page after logout
      setShowMobile(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };



  // Filter routes based on authentication
  const getNavRoutes = () => {
    return routes.filter((r) => {
      if (!r.showInNav || !r.title) return false;
      
      // Hide auth routes if user is logged in
      if (user) {
        return r.title !== "Sign Up";
      }
      
      // Show all visible routes if user is not logged in
      return true;
    });
  };

  // Get user's display name
  const getUserDisplayName = () => {
    if (!userData) return "User";
    return userData.name || userData.email?.split("@")[0] || "User";
  };

  // Get user's profile picture
  const getUserProfilePicture = () => {
    if (userData?.profilePicture) return userData.profilePicture;
    if (user?.photoURL) return user.photoURL;
    return `https://ui-avatars.com/api/?name=${getUserDisplayName()}&background=74377a&color=fff`;
  };

  // Check if user is admin (you'll need to set this in your user data)
  const isAdmin = userData?.role === "admin";

  if (loading) {
    return (
      <nav className="fixed w-full backdrop-blur-sm bg-[#74377a] z-50 shadow-sm pt-3 pb-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="w-[90px] h-[90px] bg-gray-700/50 rounded animate-pulse"></div>
              <span className="text-xl font-bold text-white hidden sm:block pl-2">Gene Craft</span>
            </div>
            <div className="hidden md:flex space-x-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-16 h-6 bg-gray-700/50 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="md:hidden">
              <div className="w-8 h-8 bg-gray-700/50 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed w-full backdrop-blur-sm bg-[#74377a] z-50 shadow-sm pt-3 pb-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - navigates to dashboard if logged in, home if not */}
          <Link 
            to={user ? "/student/dashboard" : "/"} // Navigates to: /student/dashboard if logged in, / if not
            className="flex items-center" 
            onClick={() => setShowMobile(false)}
          >
            <div className="w-[90px] h-[90px] overflow-hidden">
              <img 
                src="/icons/LogoGen.png" 
                alt="Logo" 
                className="w-full h-full object-cover bg-white p-1 rounded"
              />
            </div>
            <span className="text-xl font-bold text-white hidden sm:block pl-2">Gene Craft</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {getNavRoutes().map((r) => (
                <Link
                  key={r.path}
                  to={r.path} // Navigates to the route's path from routes.js
                  className={`relative group flex items-center text-white hover:text-gray-100 px-1 py-2 text-md font-medium transition-colors duration-200 ${
                    r.title === "Sign Up" 
                      ? "px-4 py-2 rounded-lg border-2 border-white hover:bg-white/10 transition"
                      : ""
                  }`}
                >
                  {r.title}
                  
                  {/* Animated underline for non-button links */}
                  {r.title !== "Sign Up" && (
                    <span
                      className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ease-out ${
                        location.pathname === r.path
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  )}
                </Link>
              ))}
            </div>

            {/* User section */}
            {user ? (
              <div className="relative group ml-4">
                <div className="flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                  <img
                    src={getUserProfilePicture()}
                    alt={getUserDisplayName()}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  <div className="hidden lg:block">
                    <p className="text-white font-medium text-sm">
                      {getUserDisplayName()}
                    </p>
                    <p className="text-white/70 text-xs">
                      {userData?.role === "admin" ? "Admin" : "Student"}
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold text-gray-800">{getUserDisplayName()}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  
                  {/* DASHBOARD LINK - Only show this link */}
                  <Link
                    to="/student/dashboard" // Navigates to: /student/dashboard
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowMobile(false)}
                  >
                    <FaTachometerAlt className="mr-3 text-gray-500" />
                    Dashboard
                  </Link>
                  
                  {/* ADMIN PANEL LINK - Only shown for admin users */}
                  {isAdmin && (
                    <Link
                      to="/admin/dashboard" // Navigates to: /admin/dashboard
                      className="flex items-center px-4 py-3 text-purple-600 hover:bg-purple-50 transition-colors"
                      onClick={() => setShowMobile(false)}
                    >
                      <FaTachometerAlt className="mr-3" />
                      Admin Panel
                    </Link>
                  )}
                  
                  {/* LOGOUT BUTTON */}
                  <div className="border-t mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors rounded-lg mx-2"
                    >
                      <FaSignOutAlt className="mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Show these when user is NOT logged in */
              <div className="flex items-center space-x-4 ml-4">
                <Link
                  to="/users/login" // Navigates to: /users/login
                  className="text-white hover:text-gray-200 px-4 py-2 font-medium transition-colors"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button with user indicator */}
          <div className="md:hidden flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2">
                <img
                  src={getUserProfilePicture()}
                  alt={getUserDisplayName()}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <span className="text-white text-sm font-medium hidden sm:block">
                  {getUserDisplayName()}
                </span>
              </div>
            )}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={showMobile}
              onClick={toggleNav}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-8 w-8 transform transition-transform duration-200 ${showMobile ? 'rotate-90' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={showMobile ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${showMobile ? 'max-h-[80vh] overflow-y-auto' : 'max-h-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1 bg-gradient-to-b from-[#74377a] to-[#5c2e63]">
          {/* Main navigation links */}
          <div className="mb-4">
            <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wider px-3 py-2">
              Navigation
            </h3>
            {getNavRoutes().map((r) => (
              <Link
                key={r.path}
                to={r.path} // Navigates to the route's path from routes.js
                onClick={() => setShowMobile(false)}
                className={`flex items-center px-4 py-3 rounded-lg mx-1 text-lg font-medium text-white hover:bg-white/10 transition-colors duration-200 ${
                  location.pathname === r.path ? 'bg-white/10 font-semibold' : ''
                }`}
              >
                {r.title}
              </Link>
            ))}
          </div>

          {/* User section */}
          <div className="border-t border-white/20 pt-4">
            {user ? (
              <>
                <div className="px-4 py-3 flex items-center space-x-3">
                  <img
                    src={getUserProfilePicture()}
                    alt={getUserDisplayName()}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  <div>
                    <p className="text-white font-medium">{getUserDisplayName()}</p>
                    <p className="text-white/70 text-sm">{user.email}</p>
                    <p className="text-white/50 text-xs mt-1">
                      {userData?.role === "admin" ? "Administrator" : "Student"}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-1 mt-2">
                  {/* DASHBOARD LINK - Mobile */}
                  <Link
                    to="/student/dashboard" // Navigates to: /student/dashboard
                    onClick={() => setShowMobile(false)}
                    className="flex items-center px-4 py-3 rounded-lg mx-1 text-white hover:bg-white/10 transition-colors"
                  >
                    <FaTachometerAlt className="mr-3" />
                    Dashboard
                  </Link>
                  
                  {/* ADMIN PANEL LINK - Mobile (only for admins) */}
                  {isAdmin && (
                    <Link
                      to="/admin/dashboard" // Navigates to: /admin/dashboard
                      onClick={() => setShowMobile(false)}
                      className="flex items-center px-4 py-3 rounded-lg mx-1 text-white hover:bg-white/10 transition-colors"
                    >
                      <FaTachometerAlt className="mr-3" />
                      Admin Panel
                    </Link>
                  )}
                  
                  {/* LOGOUT BUTTON - Mobile */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowMobile(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-3 rounded-lg mx-1 text-red-300 hover:bg-red-500/20 transition-colors"
                  >
                    <FaSignOutAlt className="mr-3" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              /* Mobile auth links when user is NOT logged in */
              <>
                <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wider px-3 py-2">
                  Account
                </h3>
                <Link
                  to="/users/login" // Navigates to: /users/login
                  onClick={() => setShowMobile(false)}
                  className="flex items-center px-4 py-3 rounded-lg mx-1 text-white hover:bg-white/10 transition-colors"
                >
                  <FaUser className="mr-3" />
                  Login
                </Link>
                <Link
                  to="/users/signup" // Navigates to: /users/signup
                  onClick={() => setShowMobile(false)}
                  className="flex items-center px-4 py-3 rounded-lg mx-1 bg-white text-[#74377a] font-semibold hover:bg-gray-100 transition-colors"
                >
                  <FaUser className="mr-3" />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}