import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import AdminProfile from "./AdminProfile";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({
    profile: { name: "", email: "", bio: "", avatar: "" },
    account: { username: "admin", language: "English", timezone: "UTC-5" },
    notifications: { email: true, push: true, newsletter: false },
    security: { twoFactor: false, loginAlerts: true },
    appearance: { theme: "light", fontSize: "medium", density: "comfortable" }
  });

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setSettings({
        account: { 
          username: "admin_user", 
          language: "English", 
          timezone: "UTC-5" 
        },
        notifications: { 
          email: true, 
          push: true, 
          newsletter: false,
          securityAlerts: true,
          courseUpdates: true
        },
        security: { 
          twoFactor: false, 
          loginAlerts: true,
          sessionTimeout: 30,
          passwordLastChanged: "2023-11-15"
        },
        appearance: { 
          theme: "light", 
          fontSize: "medium", 
          density: "comfortable",
          sidebarCollapsed: false
        }
      });
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: "profile", name: "Profile", icon: "👤" },
    { id: "account", name: "Account", icon: "⚙️" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
    { id: "security", name: "Security", icon: "🔒" },
    { id: "appearance", name: "Appearance", icon: "🎨" }
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-6 ml-64">
          <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 space-y-3">
                {[1, 2, 3, 4, 5].map(item => (
                  <div key={item} className="h-12 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="lg:col-span-3 space-y-4">
                <div className="h-64 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                <p className="text-gray-500">Manage your account settings and preferences</p>
              </div>
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                Save Changes
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1 border-r border-gray-100">
              <nav className="p-6 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-600 border border-blue-100"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-xl mr-3">{tab.icon}</span>
                    <span className="font-medium">{tab.name}</span>
                    {activeTab === tab.id && (
                      <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 p-6">
              {/* Profile Settings */}
            <AdminProfile />

              {/* Account Settings */}
              {activeTab === "account" && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-xl font-semibold text-gray-800">Account Preferences</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                      <input
                        type="text"
                        value={settings.account.username}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select
                        value={settings.account.language}
                        onChange={(e) => setSettings({...settings, account: {...settings.account, language: e.target.value}})}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                      <select
                        value={settings.account.timezone}
                        onChange={(e) => setSettings({...settings, account: {...settings.account, timezone: e.target.value}})}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option>UTC-5</option>
                        <option>UTC-0</option>
                        <option>UTC+1</option>
                        <option>UTC+8</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-xl font-semibold text-gray-800">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    {Object.entries(settings.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                          <p className="text-sm text-gray-500">Receive {key.toLowerCase()} notifications</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() => setSettings({
                              ...settings,
                              notifications: {...settings.notifications, [key]: !value}
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add more settings sections for security, appearance, etc. */}
              
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}