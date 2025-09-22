import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Hardcoded Genetics course images with names and details
const geneticsCourses = [
  {
    id: 1,
    image: "https://res.cloudinary.com/ddquednvr/image/upload/v1756835286/IMG_202508240_215818190_ntctef.jpg",
    name: "Genomic Sequencing Fundamentals",
    instructor: "Dr. Emily Chen",
    duration: "8 weeks",
    level: "Intermediate",
    rating: 4.8,
    students: 1245
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/ddquednvr/image/upload/v1756835286/IMG_202508240_215837441_jx04cy.jpg",
    name: "CRISPR Technology & Applications",
    instructor: "Prof. Michael Rodriguez",
    duration: "10 weeks",
    level: "Advanced",
    rating: 4.9,
    students: 987
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/ddquednvr/image/upload/v1756835291/IMG_202508240_215839588_swp1gg.jpg",
    name: "Genetic Counseling Certification",
    instructor: "Dr. Sarah Johnson",
    duration: "12 weeks",
    level: "Beginner",
    rating: 4.7,
    students: 1567
  }
];

export default function FeaturedCourses() {
  useGSAP(() => {
    // Animate course cards
    gsap.from(".course-card", {
      opacity: 0,
      y: 80,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".featured-courses-section",
        start: "top 85%",
      }
    });

    // Animate section title
    gsap.from(".section-title", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".featured-courses-section",
        start: "top 90%",
      }
    });

    // Animate CTA button
    gsap.from(".cta-button", {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      delay: 0.5,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".featured-courses-section",
        start: "top 85%",
      }
    });

    // Hover animations for course cards
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }, []);

  return (
    <section className="featured-courses-section bg-gray-400 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 section-title">
          <span className="inline-block px-4 py-2 bg-[#74377a]/10 text-[#74377a] dark:text-[#f9b7dd] rounded-full text-sm font-semibold mb-4">
            Genetics Courses
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f9b7dd] to-[#74377a]">Courses</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our cutting-edge genetics programs taught by industry experts
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {geneticsCourses.map((course) => (
            <div 
              key={course.id} 
              className="course-card bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-[#f9b7dd]/20 dark:border-[#74377a]/30 group"
            >
              {/* Course Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.name}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-[#74377a] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {course.level}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#74377a]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <button className="w-full py-2 bg-white text-[#74377a] font-semibold rounded-lg transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                    Quick View
                  </button>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#74377a] dark:group-hover:text-[#f9b7dd] transition-colors duration-300">
                  {course.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Instructor: <span className="font-medium">{course.instructor}</span>
                </p>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-[#f9b7dd]' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {course.rating} ({course.students.toLocaleString()} students)
                  </span>
                </div>

                {/* Course Details */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </span>
                  <span className="text-lg font-bold text-[#74377a] dark:text-[#f9b7dd]">
                    $199
                  </span>
                </div>

                {/* Action Button */}
                <button className="w-full py-3 bg-gradient-to-r from-[#f9b7dd] to-[#74377a] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#74377a]/40 transition-all duration-300 transform hover:-translate-y-1">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center cta-button">
          <Link
            to="/courses"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#f9b7dd] to-[#74377a] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#74377a]/40 transition-all duration-300 group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#74377a] to-[#f9b7dd] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">View All Genetics Courses</span>
            <svg 
              className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 relative z-10" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-[#f9b7dd]/30">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#74377a] dark:text-[#f9b7dd]">50+</div>
            <div className="text-gray-600 dark:text-gray-300">Courses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#74377a] dark:text-[#f9b7dd]">10K+</div>
            <div className="text-gray-600 dark:text-gray-300">Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#74377a] dark:text-[#f9b7dd]">25+</div>
            <div className="text-gray-600 dark:text-gray-300">Instructors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#74377a] dark:text-[#f9b7dd]">98%</div>
            <div className="text-gray-600 dark:text-gray-300">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}