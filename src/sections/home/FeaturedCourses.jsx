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

  // 🔹 Fetch courses
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

  // 🔹 GSAP animations
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
    <section className="featured-courses-section bg-gray-400 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 section-title">
          <span className="inline-block px-4 py-2 bg-[#74377a]/10 text-[#74377a] dark:text-[#f9b7dd] rounded-full text-sm font-semibold mb-4">
            Genetics Courses
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            In-person{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f9b7dd] to-[#74377a]">
              Training
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our cutting-edge genetics programs taught by industry experts
          </p>
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <p className="text-center text-gray-700">Loading courses...</p>
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
        <div className="text-center cta-button">
          <Link
            to="/courses"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#f9b7dd] to-[#74377a] text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#74377a] to-[#f9b7dd] opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative z-10">View All Genetics Courses</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
