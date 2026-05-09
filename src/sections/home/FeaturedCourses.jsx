import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../database/firebase";
import CourseCard from "../../components/CourseCard";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      const snapshot = await getDocs(collection(db, "courses"));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(data.slice(0, 3)); // limit for home
      setIsLoading(false);
    };

    fetchCourses();
  }, []);

  // GSAP animations
  useGSAP(() => {
    gsap.from(".course-card", {
      opacity: 0,
      y: 80,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".featured-courses-section",
        start: "top 85%",
      },
    });

    gsap.from(".section-title", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".featured-courses-section",
        start: "top 90%",
      },
    });

    gsap.from(".cta-button", {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".featured-courses-section",
        start: "top 85%",
      },
    });
  }, []);

  return (
    <section className="featured-courses-section bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 section-title">
          <span className="inline-block w-10 h-1 bg-[#74377a] rounded-sm mb-4"></span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            In-person{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f9b7dd] to-[#74377a]">
              Training
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Customize your learning to fit in with your schedules
          </p>
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex items-center gap-3 text-[#74377a]">
              <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-lg font-medium">Loading courses...</span>
            </div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#74377a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No courses available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {courses.map(course => (
              <div key={course.id} className="course-card">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {courses.length > 0 && (
          <div className="text-center cta-button">
            <Link
              to="/courses"
              className="inline-flex items-center px-8 py-4 bg-[#74377a] text-white font-semibold rounded-xl hover:bg-[#5d2b61] hover:shadow-lg hover:shadow-[#74377a]/20 transition-all duration-300 group"
            >
              View all Available Courses
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}