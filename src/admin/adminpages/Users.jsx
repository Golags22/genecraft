import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { db } from "../../../database/firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { 
  FiSearch, 
  FiFilter, 
  FiUser, 
  FiMail, 
  FiCalendar, 
  FiClock, 
  FiEye, 
  FiTrash2, 
  FiEdit, 
  FiCheckCircle, 
  FiXCircle,
  FiUsers,
  FiBook,
  FiPlus,
  FiRefreshCw
} from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const allUsers = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt || null,
        lastActive: doc.data().lastActive || null
      }));
      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Change user role
  const changeUserRole = async (uid, newRole) => {
    setIsUpdating(true);
    try {
      await updateDoc(doc(db, "users", uid), { role: newRole });
      toast.success(`User role updated to ${newRole}`, {
        position: "top-right",
        autoClose: 3000,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update user role", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Toggle user status
  const toggleStatus = async (uid, currentStatus) => {
    setIsUpdating(true);
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await updateDoc(doc(db, "users", uid), { status: newStatus });
      toast.success(`User status updated to ${newStatus}`, {
        position: "top-right",
        autoClose: 3000,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update user status", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete user
  const deleteUser = async (uid, userName) => {
    if (!window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, "users", uid));
      toast.success("User deleted successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Bulk actions
  const bulkUpdateStatus = async (newStatus) => {
    setIsUpdating(true);
    try {
      const updates = selectedUsers.map(uid => 
        updateDoc(doc(db, "users", uid), { status: newStatus })
      );
      await Promise.all(updates);
      toast.success(`Updated ${selectedUsers.length} users to ${newStatus}`, {
        position: "top-right",
        autoClose: 3000,
      });
      fetchUsers();
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error bulk updating:", error);
      toast.error("Failed to update users", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const bulkDeleteUsers = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedUsers.length} users? This action cannot be undone.`)) {
      return;
    }

    setIsUpdating(true);
    try {
      const deletes = selectedUsers.map(uid => deleteDoc(doc(db, "users", uid)));
      await Promise.all(deletes);
      toast.success(`Deleted ${selectedUsers.length} users`, {
        position: "top-right",
        autoClose: 3000,
      });
      fetchUsers();
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error bulk deleting:", error);
      toast.error("Failed to delete users", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Selection
  const toggleUserSelection = (id) => {
    setSelectedUsers(prev => 
      prev.includes(id) 
        ? prev.filter(userId => userId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  // Filtered users
  const filteredUsers = users.filter(user =>
    ((user.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
     (user.email || "").toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === "all" || (user.status || "").toLowerCase() === filterStatus.toLowerCase()) &&
    (filterRole === "all" || (user.role || "").toLowerCase() === filterRole.toLowerCase())
  );

  // Colors
  const getStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "suspended": return "bg-red-100 text-red-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getRoleColor = (role) => {
    switch ((role || "").toLowerCase()) {
      case "admin": return "bg-purple-100 text-purple-800";
      case "instructor": return "bg-blue-100 text-blue-800";
      case "student": return "bg-green-100 text-green-800";
      case "superuser": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString();
    }
    return new Date(timestamp).toLocaleDateString();
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp) return "-";
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    }
    return new Date(timestamp).toLocaleString();
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
              <h3 className="text-lg font-medium text-gray-700">Loading Users</h3>
              <p className="text-gray-500 mt-1">Please wait while we fetch user data...</p>
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">User Management</h1>
              <p className="text-gray-600">Manage and monitor all system users</p>
            </div>
            <button
              onClick={fetchUsers}
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <FiRefreshCw className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Controls Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
              </div>
              
              <div className="flex gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiFilter className="text-gray-400" />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                  >
                    <option value="all">All Roles</option>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                    <option value="superuser">Superuser</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="bg-blue-50 px-6 py-4 border border-blue-200 rounded-lg mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="text-blue-700 mb-2 sm:mb-0">
              {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => bulkUpdateStatus("active")} 
                disabled={isUpdating}
                className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 disabled:opacity-50 transition-colors"
              >
                <FiCheckCircle className="mr-1" /> Activate
              </button>
              <button 
                onClick={() => bulkUpdateStatus("inactive")} 
                disabled={isUpdating}
                className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 disabled:opacity-50 transition-colors"
              >
                <FiXCircle className="mr-1" /> Deactivate
              </button>
              <button 
                onClick={bulkDeleteUsers} 
                disabled={isUpdating}
                className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 disabled:opacity-50 transition-colors"
              >
                <FiTrash2 className="mr-1" /> Delete
              </button>
            </div>
          </div>
        )}

        {/* Users Table Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                    <input 
                      type="checkbox" 
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0} 
                      onChange={toggleSelectAll} 
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <FiUsers className="w-12 h-12 text-gray-300 mb-3" />
                        <h3 className="text-lg font-medium text-gray-500">No users found</h3>
                        <p className="text-gray-400 mt-1">
                          {searchTerm || filterStatus !== "all" || filterRole !== "all" 
                            ? "Try adjusting your search or filter criteria" 
                            : "No users in the system yet"
                          }
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          checked={selectedUsers.includes(user.id)} 
                          onChange={() => toggleUserSelection(user.id)} 
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {user.fullName?.charAt(0) || user.email?.charAt(0) || "U"}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.fullName || "Unknown User"}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <FiMail className="mr-1 w-3 h-3" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <select 
                          value={user.role || "student"} 
                          onChange={(e) => changeUserRole(user.id, e.target.value)} 
                          disabled={user.role === "superuser" || isUpdating}
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)} focus:ring-2 focus:ring-indigo-500 disabled:opacity-50`}
                        >
                          <option value="student">Student</option>
                          <option value="instructor">Instructor</option>
                          <option value="admin">Admin</option>
                          {user.role === "superuser" && <option value="superuser">Superuser</option>}
                        </select>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                            {user.status || "active"}
                          </span>
                          <button 
                            onClick={() => toggleStatus(user.id, user.status || "active")} 
                            disabled={isUpdating}
                            className="ml-2 text-sm text-indigo-600 hover:text-indigo-900 disabled:opacity-50 transition-colors"
                          >
                            Toggle
                          </button>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900 font-medium">
                          <FiBook className="mr-1 text-gray-400" />
                          {user.coursesEnrolled?.length || 0}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <FiCalendar className="mr-1 text-gray-400" />
                          {formatDate(user.createdAt)}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <FiClock className="mr-1 text-gray-400" />
                          {formatDateTime(user.lastActive)}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-indigo-600 hover:text-indigo-900 transition-colors p-1 rounded hover:bg-indigo-50">
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteUser(user.id, user.fullName || user.email)} 
                            disabled={isUpdating}
                            className="text-red-600 hover:text-red-900 transition-colors p-1 rounded hover:bg-red-50 disabled:opacity-50"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
    </div>
  );
}