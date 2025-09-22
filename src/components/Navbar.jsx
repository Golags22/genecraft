import { Link, useLocation } from "react-router-dom";
import { routes } from "../routes";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [showMobile, setShowMobile] = useState(false);

  function toggleNav() {
    setShowMobile(prev => !prev);
  }

  return (
    <nav className="fixed w-full backdrop-blur-sm bg-[#74377a] z-50 shadow-sm pt-3 pb-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-[90px] h-[90px] overflow-hidden">
  <img 
    src="/icons/LogoGen.png" 
    alt="Logo" 
    className="w-full h-full object-cover bg-white p-1 rounded"
  />
</div>

            <span className=" text-xl font-bold text-white hidden sm:block pl-2">Gene Craft</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {routes
                .filter((r) => r.showInNav)
                .map((r) => (
                  <Link
                    key={r.path}
                    to={r.path}
                    className={`relative group text-white hover:text-gray-100 px-1 py-2 text-md font-medium transition-colors duration-200 ${r.title === "Sign Up" ? "w-[100px] h-auto outline outline-offset-2 outline-1 flex items-center justify-center bg-[#74377a] text-white font-semibold px-4 py-2 rounded hover:bg-[#5c2e63] transition z-50": "" }}`}
                  >
                    {r.title}
                 
                    {/* Animated underline */}
                    <span
  className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ease-out ${
    location.pathname === r.path
      ? "w-full"
      : "w-0 group-hover:w-full"
  } ${r.path === "/users/signup" ? "hidden" : ""}`}
></span>

                  </Link>
                ))}
            </div>
          </div>
          

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 focus:outline-none transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={showMobile}
              onClick={toggleNav}
            >
              <span className="sr-only">Open main menu</span>
              {/* Animated hamburger icon */}
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

      {/* Mobile menu with smooth animation */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${showMobile ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-gradient-to-b from-[#0b3c9192] to-[#00C896]">
          {routes
            .filter((r) => r.showInNav)
            .map((r) => (
              <Link
                key={r.path}
                to={r.path}
                onClick={toggleNav}
                className={`block px-3 py-3 rounded-md text-lg font-medium text-white hover:bg-white/20 transition-colors duration-200 ${
                  location.pathname === r.path ? 'bg-white/10 font-semibold' : ''
                }`}
              >
                {r.title}
              </Link>
            ))}
        </div>
      </div>
    </nav>
  );
}