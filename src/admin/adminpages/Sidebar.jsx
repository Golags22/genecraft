import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { db } from "../../../database/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Logout } from '../../../auth';
import { 
  FiHome, 
  FiBook, 
  FiUsers, 
  FiFolder, 
  FiSettings, 
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiUser
} from 'react-icons/fi';

export default function Sidebar() {
  const [activePath, setActivePath] = useState('');
  const [admin, setAdmin] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const links = [
    { 
      name: "Dashboard", 
      path: "/admin/dashboard", 
      icon: <FiHome className="w-5 h-5" />
    },
    { 
      name: "Manage Courses", 
      path: "/admin/coursetable", 
      icon: <FiBook className="w-5 h-5" />
    },
    { 
      name: "Users", 
      path: "/admin/users", 
      icon: <FiUsers className="w-5 h-5" />
    },
    { 
      name: "Resources", 
      path: "/admin/resources", 
      icon: <FiFolder className="w-5 h-5" />
    },
    { 
      name: "Settings", 
      path: "/admin/settings", 
      icon: <FiSettings className="w-5 h-5" />
    },
    { 
      name: "Logout", 
      path: "/users/logout", 
      icon: <button className='p-1.5 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors'><FiLogOut className="w-4 h-4 text-red-500 group-hover:text-red-600" /> </button> 
    },
  ];

  useEffect(() => {
    const fetchAdmin = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, "users"), where("role", "==", "admin"));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const adminDoc = querySnapshot.docs[0];
          setAdmin({ id: adminDoc.id, ...adminDoc.data() });
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

    fetchAdmin();
  }, []);

  return (
    <aside className={`
      bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white h-screen fixed z-50
      transition-all duration-300 ease-in-out shadow-2xl border-r border-gray-700/50
      ${isCollapsed ? 'w-20' : 'w-64'}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <FiUser className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Admin Panel
            </h2>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-700/50 transition-all duration-200 group"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <FiChevronRight className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
          ) : (
            <FiChevronLeft className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1 flex-1">
        {links.map((link, idx) => {
          const isActive = activePath === link.path;
          
          return (
            <Link
              key={idx}
              to={link.path}
              className={`
                group relative flex items-center p-3 rounded-xl cursor-pointer
                transition-all duration-300 ease-out overflow-hidden
                ${isActive
                  ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-cyan-400 border-l-2 border-cyan-400' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              {/* Hover effect */}
              <div className={`
                absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl
                transition-all duration-300 ease-out
                ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
              `}></div>
              
              {/* Icon */}
              <span className={`
                transition-all duration-300 relative z-10
                ${isActive ? 'text-cyan-400 scale-110' : 'group-hover:scale-110'}
                ${isCollapsed ? '' : 'mr-3'}
              `}>
                {link.icon}
              </span>
              
              {/* Text with slide animation */}
              {!isCollapsed && (
                <span className="flex-1 font-medium text-sm transition-all duration-300 relative z-10">
                  {link.name}
                </span>
              )}
              
              {/* Active indicator */}
              {isActive && !isCollapsed && (
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg z-50">
                  {link.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-700/50 fixed bottom-0 w-au
        ">
          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {admin?.fullName?.charAt(0) || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {admin?.fullName || (isLoading ? "Loading..." : "Administrator")}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {admin?.email || "admin@example.com"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed user profile */}
      {isCollapsed && (
        <div className="p-4 border-t border-gray-700/50">
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
              {admin?.fullName?.charAt(0) || "A"}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}