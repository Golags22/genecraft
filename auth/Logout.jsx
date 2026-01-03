import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Logout() {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggingOut(true);
    navigate("/users/login",{replace: true});
    // Simulate logout process
    setTimeout(() => {
      // Actual logout logic would go here
      console.log("User logged out");
      setIsOpen(false);
    }, 1500);
  };

  const handleCancel = () => {
    setIsOpen(false);
    // Navigate back or close modal
    navigate("/admin/dashboard", { replace: true })
    console.log("Logout cancelled");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all duration-300 scale-95 animate-in fade-in-90 zoom-in-90">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-8 h-8 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Log Out</h2>
          <p className="text-gray-600">Are you sure you want to log out of your account?</p>
        </div>

        {/* Progress bar for logout animation */}
        {isLoggingOut && (
          <div className="w-full bg-gray-200 h-1">
            <div className="bg-red-600 h-1 transition-all duration-1000 ease-out animate-pulse" style={{ width: isLoggingOut ? '100%' : '0%' }}></div>
          </div>
        )}

        {/* Buttons */}
        <div className="p-6 flex space-x-4">
          <button
            onClick={handleCancel}
            disabled={isLoggingOut}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-gray-700 font-medium rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoggingOut ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging out...
              </>
            ) : (
              "Log Out"
            )}
          </button>
        </div>

        {/* Security notice */}
        <div className="px-6 pb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-sm text-blue-700">For security reasons, please log out when you're done using your account.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { transform: scale(0.95); }
          to { transform: scale(1); }
        }
        .animate-in {
          animation: fadeIn 0.2s ease-out, zoomIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}