export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-24 md:py-32 px-6 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-white"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-white"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Transform Your Learning Experience
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
          Discover powerful tools to enhance your education journey with our innovative platform.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-4 bg-white text-blue-700 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            Get Started
            <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
          
          <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:bg-opacity-10 transition-all duration-300 hover:scale-105">
            Learn More
          </button>
        </div>
      </div>

      {/* App screenshot or illustration */}
      <div className="mt-16 max-w-4xl mx-auto relative">
        <div className="relative rounded-xl shadow-2xl overflow-hidden">
          <img 
            src="https://cdn.pixabay.com/photo/2021/11/10/18/21/woman-6784555_1280.jpg" 
            alt="Application dashboard preview" 
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}