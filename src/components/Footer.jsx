import { Link, useLocation } from "react-router-dom";
import { routes } from "../routes";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/icons/logo1.png" 
                alt="E-Learn Logo" 
                className="h-10 w-10 mr-3"
              />
              <span className="text-2xl font-bold text-white">Gene Craft</span>
            </div>
            <p className="text-gray-400">
              Empowering learners worldwide with accessible, high-quality education.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'linkedin', 'instagram'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label={`Follow us on ${social}`}
                >
                  <span className="sr-only">{social}</span>
                  <svg 
                    className="h-6 w-6" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={`M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z`} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
               {routes
                .filter((r) => r.showInNav)
                .map((r) => (
                  <Link
                    key={r.path}
                    to={r.path}
                    className={"text-gray-400 hover:text-white transition-colors duration-300 hover:pl-2 block"}
                  >
                    {r.title}
                  </Link>
                ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-2">
              {['Blog', 'Tutorials', 'Webinars', 'Documentation'].map((resource) => (
                <li key={resource}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors duration-300 hover:pl-2 block"
                  >
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
            <p className="text-gray-400">
              Subscribe to our newsletter for the latest courses and updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} E-Learn. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed animate-bounce bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none"
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </footer>
  );
}