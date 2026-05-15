import { partners } from "../../Data/data";
import { useState, useEffect } from "react";

export default function Partners() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  // Handle responsive slides to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % partners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [partners.length]);

  // Reset current slide when slidesToShow changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [slidesToShow]);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#74377a]/5 via-white to-[#74377a]/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Our Valued <span className="text-[#74377a]">Partners</span>
          </h2>
        </div>

        {/* Partners Carousel */}
        <div className="relative overflow-hidden px-4 sm:px-8 md:px-12">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}
          >
            {[...partners, ...partners].map((partner, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 px-2 sm:px-3 md:px-4"
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <div className="bg-white rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center h-40 sm:h-48 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-2 border-transparent hover:border-[#74377a]/20">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-3">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-center text-gray-700 group-hover:text-[#74377a] transition-colors">
                    {partner.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Hidden on mobile */}
          <button 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + partners.length) % partners.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-[#74377a] hover:text-white transition-all duration-300 hover:scale-110 group hidden sm:block"
            aria-label="Previous partners"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#74377a] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          
          <button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % partners.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-[#74377a] hover:text-white transition-all duration-300 hover:scale-110 group hidden sm:block"
            aria-label="Next partners"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#74377a] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8 flex-wrap">
          {partners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx 
                  ? "w-6 sm:w-8 bg-[#74377a]" 
                  : "w-2 bg-[#74377a]/30 hover:bg-[#74377a]/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}