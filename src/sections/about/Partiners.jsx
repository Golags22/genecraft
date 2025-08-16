import { partners } from "../../Data/data";
import { useState, useEffect } from "react";

export default function Partners() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 4; // Adjust based on your responsive needs

  // Auto-rotate partners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % partners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [partners.length]);

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            <span className="relative inline-block">
              Our Valued Partners
              <span className="absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transform -translate-y-2"></span>
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Collaborating with leading organizations to advance microbial genomics education
          </p>
        </div>

        {/* Partners Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}
          >
            {[...partners, ...partners].map((partner, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 px-4"
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-center h-48 hover:shadow-lg transition-all duration-300">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-16 object-contain mb-4 grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <h3 className="text-lg font-medium text-center text-gray-800 dark:text-gray-200">
                    {partner.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + partners.length) % partners.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
            aria-label="Previous partners"
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          
          <button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % partners.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
            aria-label="Next partners"
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-bold rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
            Become a Partner
          </button>
        </div>
      </div>
    </section>
  );
}