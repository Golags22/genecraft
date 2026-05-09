import { useState, useEffect } from "react";
import { FiBook, FiUsers, FiAward, FiStar, FiArrowRight, FiPlay } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const statInterval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(statInterval);
  }, []);

  const stats = [
    { icon: <FiUsers className="w-6 h-6" />, number: "30+", label: "Students Trained" },
    { icon: <FiBook className="w-6 h-6" />, number: "3+", label: "Courses Available" },
    { icon: <FiAward  className="w-6 h-6" />, number: "3+", label: "Cohort Delivered" },
    { icon: <FiStar className="w-6 h-6" />, number: "4.9/5", label: "Student Rating" }
  ];

  const areas = [
    {
      number: "1.",
      title: "Gene Annotation and Prediction",
      subtitle: "Where are the genes, and what do they do?",
      details: "Learn to identify genes in new genomes and assign functions using ab initio prediction with GALAXY workflow homology-based annotation with BLAST and functional annotation with InterProScan."
    },
    {
      number: "2.",
      title: "Functional Genomics",
      subtitle: "What do genes actually do?_",
      details: "Run RNA-Seq analysis to find differentially expressed genes, ChIP-Seq analysis to map transcription factor binding, and pathway enrichment using KEGG/GO to interpret biological function."
    },
    {
      number: "3.",
      title: "Comparative Genomics",
      subtitle: "How do genomes differ across species or strains?",
      details: "Perform whole-genome alignment to spot virulence factors, ortholog detection across humans and other mammals and phylogenetics to build evolutionary trees and track pathogen spread."
    },
    {
      number: "4.",
      title: "Computer-Aided Drug Design (CADD)",
      subtitle: "Can we predict which molecules will bind a target protein?",
      details: "Conduct molecular docking of plant compounds against malaria proteins with AutoDock, virtual screening with ADMET filtering, and target identification from genomics data to find drug targets in pathogens."
    }
  ];

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative text-white py-20 md:py-28 lg:py-32 overflow-hidden min-h-screen flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#74377a] via-[#8a4a8f] to-[#74377a]"></div>

        {/* Floating elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>

        {/* Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            What we offer
          </h1>

          <p
            className={`text-lg md:text-xl lg:text-2xl mx-auto mb-10 max-w-5xl leading-relaxed transition-all duration-700 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            A 3-month online training program in genomic data analysis that gives individuals in the field of biological sciences the practical experiences in using various bioinformatics tools and resources for research and employability.           </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row justify-center gap-5 mb-16 transition-all duration-700 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <Link
              to="/courses"
              className="group px-8 py-4 bg-white text-[#74377a] rounded-xl font-bold hover:bg-pink-100 transition-all duration-300 hover:scale-105 shadow-xl flex items-center justify-center"
            >
              Explore Courses
              <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
<a href="#howitwork">
            <button
            className="group px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center justify-center">
              <FiPlay className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              How It Works
            </button>
            </a>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto transition-all duration-700 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                  currentStat === index ? "bg-white/20 scale-105 shadow-lg" : "bg-white/10"
                }`}
              >
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold">{stat.number}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* ===== WHAT WE OFFER SECTION ===== */}
      <section 
    
      className="max-w-5xl mx-auto px-6 py-20">
        <div className="mb-12">
          <span className="block w-10 h-1 bg-[#74377a] rounded-sm mb-4"></span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            Core Areas
          </h2>
          <p className="text-lg text-gray-500">
            You'll master hands-on analysis in any of these core areas:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {areas.map((area, index) => (
            <div
              key={index}
              className="flex gap-5 p-6 bg-white rounded-xl border border-purple-100 hover:shadow-lg hover:shadow-[#74377a]/10 hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <span className="text-lg font-bold text-[#74377a] bg-purple-50 px-3 py-1 rounded-lg h-fit flex-shrink-0">
                {area.number}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-1.5">
                  {area.title}
                </h3>
                <p className="text-sm italic text-[#74377a] font-medium mb-2.5">
                  {area.subtitle}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {area.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}