import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import AdminProfile from "./AdminProfile";

export default function Settings() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-4">

            {/* Main Content */}
            <div className="lg:col-span-3 p-6">
              {/* Profile Settings */}
            <AdminProfile />

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