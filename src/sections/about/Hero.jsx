import { useState, useEffect } from "react";
import { FiBook, FiUsers, FiAward, FiStar, FiArrowRight, FiPlay } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-white animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main heading with animation */}
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          Transform Your Future with{" "}
          <span className="text-yellow-300 bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
            Gene-Craft
          </span>
        </h1>
        
        {/* Description with improved readability */}
        <p className="text-lg md:text-xl lg:text-2xl mx-auto mb-10 max-w-6xl leading-relaxed transition-all duration-700 delay-100 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }">
          Gene Craft Microbial Genomics Academy (GCMGA) is a legally registered limited liability institute 
          under the Companies and Allied Matters Act (CAMA) of Nigeria, established to bridge the knowledge 
          and skills gap in microbial genomics across Nigeria and Africa.
        </p>

        {/* Call-to-action buttons */}
        <div className={`flex flex-col sm:flex-row justify-center gap-4 mb-16 transition-all duration-700 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
           <Link to="/courses">
          <button className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-900 rounded-xl font-bold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
           
            Explore Courses

            <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          </Link>
          
          <button className="group px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center justify-center">
            <FiPlay className="w-5 h-5 mr-2" />
            How It Works
          </button>
        </div>

        {/* Stats section with icons */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto transition-all duration-700 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
            <FiBook className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
            <div className="text-2xl md:text-3xl font-bold mb-2">10K+</div>
            <div className="text-sm opacity-80">Courses Available</div>
          </div>
          
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
            <FiUsers className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
            <div className="text-2xl md:text-3xl font-bold mb-2">2M+</div>
            <div className="text-sm opacity-80">Students Enrolled</div>
          </div>
          
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
            <FiAward className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
            <div className="text-2xl md:text-3xl font-bold mb-2">500+</div>
            <div className="text-sm opacity-80">Expert Instructors</div>
          </div>
          
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
            <FiStar className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
            <div className="text-2xl md:text-3xl font-bold mb-2">95%</div>
            <div className="text-sm opacity-80">Satisfaction Rate</div>
          </div>
        </div>

        {/* Trust badge */}
        <div className={`mt-12 text-sm opacity-70 transition-all duration-700 delay-500 ${
          isVisible ? 'translate-y-0 opacity-70' : 'translate-y-10 opacity-0'
        }`}>
          Trusted by leading institutions across Africa
        </div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}