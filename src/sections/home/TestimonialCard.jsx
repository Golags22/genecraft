export default function TestimonialCard({ testimonial, isHovering }) {
  return (
    <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500 group border border-gray-100 dark:border-gray-700 hover:border-blue-100 dark:hover:border-blue-800/50 overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-40 -translate-y-16 translate-x-16 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
      
      {/* Quote icon with subtle animation */}
      <div className="absolute top-6 right-6 w-14 h-14 bg-gradient-to-r from-[#f9b7dd] to-[#74377a] rounded-full flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-500 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </div>

      {/* Rating stars with animation */}
      <div className="flex items-center mb-5 transform group-hover:translate-x-1 transition-transform duration-500">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-6 h-6 transition-all duration-300 ${i < testimonial.rating ? 'text-yellow-400 transform hover:scale-125' : 'text-gray-300 dark:text-gray-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          {testimonial.rating}/5
        </span>
      </div>

      {/* Testimonial text with decorative quote marks */}
      <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-8 relative">
        <span className="absolute -top-4 -left-2 text-5xl text-blue-400/20 dark:text-blue-500/20 font-serif leading-none">"</span>
        <p className="relative z-10 leading-relaxed">{testimonial.feedback}</p>
        <span className="absolute -bottom-8 -right-2 text-5xl text-blue-400/20 dark:text-blue-500/20 font-serif leading-none rotate-180">"</span>
      </blockquote>

      {/* Author information with enhanced styling */}
      <div className="flex items-center pt-4 border-t border-gray-100 dark:border-gray-700/50">
        <div className="relative">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-white dark:border-gray-800 shadow-md group-hover:border-blue-200 dark:group-hover:border-blue-700 transition-all duration-500"
          />
          {/* Verification badge */}
          <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-0.5 shadow-sm">
            <div className="bg-blue-500 rounded-full p-1.5">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-900 dark:text-white truncate">{testimonial.name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{testimonial.role}</p>
          {testimonial.course && (
            <div className="mt-1 flex items-center">
              <svg className="w-4 h-4 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium truncate">
                Completed: {testimonial.course}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Hover effect indicator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  );
}