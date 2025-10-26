import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutSection() {
  useGSAP(() => {
    // Animate elements on scroll
    gsap.from(".about-heading", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%",
      }
    });

    gsap.from(".about-description", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%",
      }
    });

    gsap.from(".feature-card", {
      opacity: 0,
      y: 50,
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 70%",
      }
    });
  }, []);

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Industry-Recognized Certifications",
      description: "Get certified with credentials valued by employers worldwide"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: "Flexible Learning Paths",
      description: "Customize your education journey to fit your schedule and goals"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Expert Instructors",
      description: "Learn from professionals with real-world experience"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: "Practical Projects",
      description: "Build portfolio-worthy projects with hands-on learning"
    }
  ];

  return (
    <section className="about-section bg-gray-300 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#74377a]/10 text-[#74377a] rounded-full text-sm font-semibold mb-4">
            Our Advantages
          </span>
          <h2 className="about-heading text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 flex flex-wrap items-center justify-center">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f9b7dd] to-[#74377a] pr-2">Gene-Craft </span>?
          </h2>
          <p className="about-description text-xl text-gray-900 max-w-3xl mx-auto">
            We provide high-quality online courses taught by industry experts, accessible anywhere, anytime. 
            Learn at your own pace and get certified with credentials that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card bg-white dark:bg-[#74377a]/10 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="w-16 h-16 bg-[#f9b7dd]/20 dark:bg-[#74377a]/30 rounded-full flex items-center justify-center mb-6 text-[#74377a] group-hover:bg-[#f9b7dd]/30 dark:group-hover:bg-[#74377a]/50 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-800">{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
