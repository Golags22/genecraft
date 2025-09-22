import { useState, useEffect, useRef } from "react";
import { testimonials } from "../../Data/data";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef(null);

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setItemsPerView(
        width >= 1280 ? 1 : 
        width >= 1024 ? 1 : 
        width >= 768 ? 1 : 1
      );
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    let interval;
    if (isAutoPlaying && testimonials.length > itemsPerView && !isHovering) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, itemsPerView, isHovering]);

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      return nextIndex >= testimonials.length ? 0 : nextIndex;
    });
    pauseAutoPlay();
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1;
      return prevIndex < 0 ? testimonials.length - 1 : prevIndex;
    });
    pauseAutoPlay();
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    pauseAutoPlay();
  };

  return (
    <section className="bg-gray-400 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2  bg-[#74377a]/10 text-[#74377a] dark:text-[#f9b7dd] rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
            Student Voices
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-700 mb-4">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f9b7dd] to-[#74377a]">
              Students Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Hear from our community of learners who have transformed their careers
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6"
          ref={carouselRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Status indicator */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isHovering ? "Paused" : "Auto-playing"}
            </div>
            <div className="text-sm font-medium text-white">
              {currentIndex + 1} / {testimonials.length}
            </div>
          </div>
          
          {/* Carousel */}
          <div className="relative h-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`transition-all duration-500 ease-in-out ${
                  index === currentIndex 
                    ? 'opacity-100 translate-x-0' 
                    : index < currentIndex 
                      ? 'opacity-0 -translate-x-8 absolute inset-0' 
                      : 'opacity-0 translate-x-8 absolute inset-0'
                }`}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Only show if there are more testimonials than items per view */}
          {testimonials.length > itemsPerView && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Indicators */}
        {testimonials.length > itemsPerView && (
          <div className="flex justify-center mt-8  space-x-3">
            {testimonials.map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => goToTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-[#74377a] scale-125' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              );
            })}
          </div>
        )}

        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-[#f9b7dd] to-[#74377a] rounded-full text-white font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-md hover:shadow-blue-500/20 flex items-center justify-center mx-auto">
            Read More Success Stories
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}