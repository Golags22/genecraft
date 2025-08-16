export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-24 md:py-32 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-white"></div>
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-white"></div>
        <div className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-white"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
          Transform Your Future with <span className="text-yellow-300">Gene-Craft</span>
        </h1>
        
     <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 opacity-90 animate-fade-in-up delay-100">
  Gene Craft is a microbial genomics academy created to make bioinformatics knowledge 
  and skills more accessible to African undergraduate and graduate students in biosciences.  
</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-200">
          <button className="px-8 py-4 bg-white text-blue-700 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            Explore Courses
            <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
          
          <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:bg-opacity-10 transition-all duration-300 hover:scale-105">
            How It Works
          </button>
        </div>

        {/* Stats section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in-up delay-300">
          <div className="bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-sm">
            <div className="text-3xl font-bold mb-2">10K+</div>
            <div className="text-sm opacity-80">Courses Available</div>
          </div>
          <div className="bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-sm">
            <div className="text-3xl font-bold mb-2">2M+</div>
            <div className="text-sm opacity-80">Students Enrolled</div>
          </div>
          <div className="bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-sm">
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-sm opacity-80">Expert Instructors</div>
          </div>
          <div className="bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-sm">
            <div className="text-3xl font-bold mb-2">95%</div>
            <div className="text-sm opacity-80">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}