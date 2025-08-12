export default function Hero() {
  return (
    <section className="relative text-white py-32 px-6 text-center flex items-center justify-center min-h-[60vh] bg-gradient-to-r from-blue-600 to-cyan-500">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-white"></div>
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-white"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Get in <span className="text-yellow-300">Touch</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
          Whether you have questions, feedback, or partnership inquiries, we'd love to hear from you.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#contact-form"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Send Us a Message
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
          
          <a
            href="tel:+1234567890"
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:bg-opacity-10 transition-all duration-300 hover:scale-105"
          >
            Call Us Now
          </a>
        </div>
      </div>

      {/* Scrolling indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-8 h-8 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}