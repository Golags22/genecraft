import { useState, useEffect } from "react";
import { testimonials } from "../../Data/data";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setItemsPerView(
        width >= 1280 ? 3 : 
        width >= 1024 ? 3 : 
        width >= 768 ? 2 : 1
      );
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    let interval;
    if (isAutoPlaying && testimonials.length > itemsPerView) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + itemsPerView) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, itemsPerView]);

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + itemsPerView;
      return nextIndex >= testimonials.length ? 0 : nextIndex;
    });
    pauseAutoPlay();
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - itemsPerView;
      return prevIndex < 0 ? testimonials.length - itemsPerView : prevIndex;
    });
    pauseAutoPlay();
  };

  // Get visible testimonials with wrap-around
  const getVisibleTestimonials = () => {
    const endIndex = currentIndex + itemsPerView;
    
    if (endIndex <= testimonials.length) {
      return testimonials.slice(currentIndex, endIndex);
    } else {
      const remaining = endIndex - testimonials.length;
      return [
        ...testimonials.slice(currentIndex),
        ...testimonials.slice(0, remaining)
      ];
    }
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
            Student Voices
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Students Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Hear from our community of learners who have transformed their careers
          </p>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 transition-all duration-700 ease-in-out ">
            {getVisibleTestimonials().map((testimonial, idx) => (
              <TestimonialCard key={`${currentIndex}-${idx}`} testimonial={testimonial} />
            ))}
          </div>

          {/* Navigation Arrows - Only show if there are more testimonials than items per view */}
          {testimonials.length > itemsPerView && (
            <>
              <button
                onClick={prevTestimonial}
                className="left-0 bottom-100 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
                aria-label="Previous testimonials"
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute bottom-0 right-0 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
                aria-label="Next testimonials"
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
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(testimonials.length / itemsPerView) }).map((_, idx) => {
              const isActive = idx === Math.floor(currentIndex / itemsPerView);
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx * itemsPerView)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-blue-600 scale-125' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial group ${idx + 1}`}
                />
              );
            })}
          </div>
        )}

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-full shadow-sm text-white font-medium hover:shadow-md transition-all duration-300 hover:scale-105">
            Read More Success Stories
            <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}