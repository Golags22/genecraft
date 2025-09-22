import { useState } from "react";
import { FaBook, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function StudentDashboard() {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <FaBook /> },
    { name: "Profile", icon: <FaUser /> },
    { name: "Settings", icon: <FaCog /> },
    { name: "Logout", icon: <FaSignOutAlt /> },
  ];

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
              onClick={() => setActive(item.name)}
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
            <span className="text-gray-700">Hi, Emmanuel 👋</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-blue-600"
            />
          </div>
        </div>

        {/* Dashboard Content */}
        {active === "Dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h2 className="text-lg font-bold text-gray-700">My Courses</h2>
              <p className="mt-2 text-gray-500">You’re enrolled in 5 courses</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h2 className="text-lg font-bold text-gray-700">Progress</h2>
              <p className="mt-2 text-gray-500">Overall: 65% Completed</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h2 className="text-lg font-bold text-gray-700">Certificates</h2>
              <p className="mt-2 text-gray-500">2 Certificates Earned</p>
            </div>
          </div>
        )}

        {active === "Profile" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-bold text-gray-700">Profile Info</h2>
            <p className="mt-2 text-gray-500">Name: Emmanuel</p>
            <p className="text-gray-500">Email: student@example.com</p>
          </div>
        )}

        {active === "Settings" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-bold text-gray-700">Settings</h2>
            <p className="mt-2 text-gray-500">Update preferences here</p>
          </div>
        )}
      </main>
    </div>
  );
}
