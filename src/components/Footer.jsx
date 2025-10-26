import { Link, useLocation } from "react-router-dom";
import { routes } from "../routes";
import { social } from "../Data/data";

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
                {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-[90px] h-[90px] overflow-hidden">
  <img 
    src="/icons/LogoGen.png" 
    alt="Logo" 
    className="w-full h-full object-cover bg-white p-1 rounded"
  />
</div>
</Link>
              <span className="text-2xl font-bold text-white pl-6"> Gene Craft</span>
            </div>
            <p className="text-gray-400">
              Empowering learners worldwide with accessible, high-quality education in microbial genomics and bioinformatics.
            </p>
            <div className="flex space-x-4">
                {social.map((socialmedials)=>(
                  <a
                    key={socialmedials.name}
                    href={socialmedials.link}
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <img src={socialmedials.img} alt={socialmedials.name} className="w-6 h-6"
                    />
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