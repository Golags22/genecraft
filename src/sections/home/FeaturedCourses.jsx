import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { featuredCourses } from "../../Data/data";
import { CourseCard } from "../../components";

export default function FeaturedCourses() {
  useGSAP(() => {
    // Animation for cards on enter
    gsap.from(".course-card", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".featured-courses-section",
        start: "top 80%",
      }
    });

    // Hover effect for the view all button
    gsap.to(".view-all-btn", {
      scale: 1.05,
      duration: 0.3,
      paused: true,
      ease: "power1.out",
    });
  }, []);

  return (
    <section className="featured-courses-section bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
            Popular Learning Paths
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Courses</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Hand-picked by our experts to help you master in-demand skills
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/courses"
            className="view-all-btn inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 group"
          >
            <span className="relative z-10">View All Courses</span>
            <svg 
              className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}