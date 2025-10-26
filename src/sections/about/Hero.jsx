import { useState, useEffect } from "react";
import { FiBook, FiUsers, FiAward, FiStar, FiArrowRight, FiPlay, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate stats counter
    const statInterval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(statInterval);
  }, []);

  const stats = [
    { icon: <FiUsers className="w-6 h-6" />, number: "2,500+", label: "Students Enrolled" },
    { icon: <FiBook className="w-6 h-6" />, number: "50+", label: "Courses Available" },
    { icon: <FiAward className="w-6 h-6" />, number: "98%", label: "Success Rate" },
    { icon: <FiStar className="w-6 h-6" />, number: "4.9/5", label: "Student Rating" }
  ];

  return (
    <section 
      className="relative text-white py-20 md:py-28 lg:py-32 overflow-hidden min-h-screen flex items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(https://res.cloudinary.com/ddquednvr/image/upload/v1761497914/cert)'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#74377a]/80 via-[#8a4a8f]/70 to-[#f9b7dd]/60"></div>
      
      {/* Additional gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#74377a]/40 to-transparent"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white/5 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/10 animate-pulse delay-2000"></div>
      </div>

      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-40 w-32 h-32 border-4 border-white/10 rounded-lg rotate-45 animate-float"></div>
        <div className="absolute bottom-60 left-40 w-24 h-24 border-2 border-white/10 rounded-full animate-float delay-1000"></div>
        <div className="absolute top-60 left-20 w-16 h-16 border-4 border-white/10 rotate-12 animate-float delay-1500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Badge */}
        <div className={`inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8 transition-all duration-700 delay-100 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <FiAward className="w-4 h-4 mr-2 text-[#f9b7dd]" />
          <span className="text-sm font-semibold">CAMA Registered Institute</span>
        </div>

        {/* Main heading with animation */}
        <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          Transform Your Future with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#f9b7dd] relative">
            Gene-Craft
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-white to-[#f9b7dd] rounded-full"></div>
          </span>
        </h1>
        
        {/* Description */}
        <p className="text-xl md:text-2xl lg:text-3xl mx-auto mb-12 max-w-6xl leading-relaxed transition-all duration-700 delay-100 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }">
          Bridging the knowledge gap in{" "}
          <span className="font-semibold text-[#f9b7dd]">microbial genomics</span> across Africa through 
          expert-led education and cutting-edge research.
        </p>

        {/* Enhanced CTA buttons */}
        <div className={`flex flex-col sm:flex-row justify-center gap-6 mb-16 transition-all duration-700 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Link 
            to="/courses"
            className="group px-10 py-5 bg-white text-[#74377a] rounded-2xl font-bold hover:bg-[#f9b7dd] transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center justify-center transform hover:-translate-y-1"
          >
            <span className="relative z-10">Explore Courses</span>
            <FiArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-white to-[#f9b7dd] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          
          <button className="group px-10 py-5 bg-transparent border-3 border-white text-white rounded-2xl font-bold hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center justify-center transform hover:-translate-y-1 shadow-xl">
            <FiPlay className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
            <span>How It Works</span>
          </button>
        </div>

      

      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(3deg);
          }
          66% {
            transform: translateY(-8px) rotate(-2deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(249, 183, 221, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(249, 183, 221, 0.6);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}