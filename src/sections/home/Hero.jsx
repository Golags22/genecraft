import { Link } from "react-router-dom";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const heroRef = useRef(null);
  const imageContainerRef = useRef(null);
  const textRef = useRef(null);

  const images = [
    "https://media.istockphoto.com/id/2211578714/photo/lab-science-and-black-woman-with-microscope-for-research-study-sample-and-development.jpg?s=612x612&w=0&k=20&c=62f446afV0oJH35W4lwVOuIZuaechHgO7Gm5Z94D6Cc=",
    "https://media.istockphoto.com/id/1399511097/photo/monkey-pox-virus-cells-microscope-slide.jpg?s=612x612&w=0&k=20&c=QnbT3Ys2JPbo0hoLrbRbEeL57bdz55tCDhZdeRYiSD0=",
    "https://media.istockphoto.com/id/2054791669/photo/human-dna-strand-blue-dna-structure-background-3d-illustration.jpg?s=612x612&w=0&k=20&c=WzbBWrFOlY3oTlcjkC-lRDdK5kAKM5Lvhi-EFGv17cY="
  ];

  useGSAP(() => {
    gsap.from(textRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "expo.out",
      delay: 0.4
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        pin: true
      }
    });

    tl.to(".image-section:nth-child(1)", { opacity: 1, scale: 1, y: 0, duration: 0.5 })
      .to(".image-section:nth-child(2)", { opacity: 1, scale: 1.05, y: -50, duration: 1 }, 0.3)
      .to(".image-section:nth-child(1)", { opacity: 0, scale: 0.95, y: 50, duration: 1 }, 0.8)
      .to(".image-section:nth-child(3)", { opacity: 1, scale: 1.08, y: -30, duration: 1.2 }, 1.2)
      .to(".image-section:nth-child(2)", { opacity: 0, scale: 0.97, y: 40, duration: 1 }, 1.5);

    gsap.to(".image-section", {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-white flex items-center px-6 sm:px-12 lg:px-24 py-16"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(20,120,200,0.1)_0%,transparent_70%)]"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#74377a]/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#f9b7dd]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Text Content */}
      <div className="w-full lg:w-1/2 z-10 relative top-10 lg:top-0">
        <div ref={textRef} className="max-w-2xl">
          {/* Badge */}
          <div className="inline-block px-4 py-2 mb-6 bg-[#74377a]/10 backdrop-blur-sm rounded-full border border-white/10">
            <span className="text-sm font-semibold text-[#74377a]">New Courses Available</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-700 mb-6 leading-tight">
            <span className="block text-6xl"> Welcome to Gene Craft</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f9b7dd] to-[#74377a] text-4xl">
              Microbial Genomics Academy
            </span>
          </h1>
       

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-gray-700 mb-8 leading-relaxed">
            Unlock <span className="font-semibold text-gray-700">your potentials </span> with hands-on skills in Genomic data analysis and computer aided drug design(CAAD)
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            {/* Primary Button */}
            <Link
              to="/courses"
              className="relative px-8 py-4 bg-gradient-to-r from-[#f9b7dd] to-[#74377a] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#74377a]/40 transition-all duration-300 group overflow-hidden flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Explore Courses
            </Link>

            {/* Secondary Button */}
            <Link
              to="/signup"
              className="relative px-8 py-4 bg-gradient-to-r from-[#74377a] to-[#f9b7dd] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#74377a]/40 transition-all duration-300 group overflow-hidden flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Register with us
            </Link>
          </div>

         
        </div>
      </div>

      {/* Image Gallery */}
      <div ref={imageContainerRef} className="hidden lg:block absolute right-0 top-0 w-1/2 h-full overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className={`image-section absolute inset-0 w-full h-full ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: `rotate(${index * 2}deg) scale(${1 - index * 0.05})`,
              zIndex: 3 - index
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent"></div>
            <img
              src={img}
              alt={`Learning experience ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="animate-bounce flex flex-col items-center">
          <span className="text-xs text-[#74377a] mb-1">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-gradient-to-r from-[#f9b7dd] to-[#74377a] rounded-full animate-scroll-indicator"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
