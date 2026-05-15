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
    <section className="about-section bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#74377a]/10 text-[#74377a] rounded-full text-sm font-semibold mb-4">
            About Us
          </span>
          <h2 className="about-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6 flex flex-wrap items-center justify-center gap-x-2">
            Who
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f9b7dd] to-[#74377a]">
              are we
            </span>
            ?
          </h2>
          <p className="about-description text-gray-700 max-w-4xl mx-auto leading-relaxed text-left md:text-left space-y-4">
            <span className="block">
              Genecraft Microbial Genomics Academy is an in-silico lab focused on making practical training in microbial genomic data analysis. It was founded to bridge the gap between the high demand for bioinformatics skills and the limited, often expensive training opportunities available for individuals in the biological sciences field.
            </span>
            <span className="block mt-4">
              The academy offers hands-on training in microbial genomics, computer-aided drug design, and geospatial analysis. Rather than just teaching theory, participants work with genomic datasets from sources like NCBI GenBank and the European Nucleotide Archive (ENA), gaining practical experience with tools such as BLAST, Galaxy, and MEGA.
            </span>
            <span className="block mt-4">
              Genecraft also trains participants in molecular docking of plant-based compounds using tools like AutoDock, PyRx, Discovery Studio, and the Maestro interface from Schrödinger. In addition, it provides geospatial training using ArcGIS for mapping and spatial data analysis.
            </span>
            <span className="block mt-4">
              So far, the academy has successfully trained three cohorts, with 30 beneficiaries from different academic and research institutions across Nigeria. These trainees have gained useful, hands-on skills to support their research.
            </span>
          </p>
        </div>

 

      </div>
    </section>
  );
}