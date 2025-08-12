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
//   const buttonRef = useRef(null);
  
  // Curated high-res images
  const images = [
    "https://media.istockphoto.com/id/2211578714/photo/lab-science-and-black-woman-with-microscope-for-research-study-sample-and-development.jpg?s=612x612&w=0&k=20&c=62f446afV0oJH35W4lwVOuIZuaechHgO7Gm5Z94D6Cc=",
    "https://media.istockphoto.com/id/1399511097/photo/monkey-pox-virus-cells-microscope-slide.jpg?s=612x612&w=0&k=20&c=QnbT3Ys2JPbo0hoLrbRbEeL57bdz55tCDhZdeRYiSD0=",
    "https://media.istockphoto.com/id/2054791669/photo/human-dna-strand-blue-dna-structure-background-3d-illustration.jpg?s=612x612&w=0&k=20&c=WzbBWrFOlY3oTlcjkC-lRDdK5kAKM5Lvhi-EFGv17cY="
  ];

  useGSAP(() => {
    // Initial animations
    gsap.from(textRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "expo.out",
      delay: 0.4
    });

    // gsap.from(buttonRef.current.children, {
    //   opacity: 0,
    //   y: 30,
    //   duration: 0.8,
    //   stagger: 0.15,
    //   ease: "back.out(1.7)",
    //   delay: 0.8
    // });

    // Image transition timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        pin: true
      }
    });

    // First image stays dominant initially
    tl.to(".image-section:nth-child(1)", {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.5
    })
    // Second image enters
    .to(".image-section:nth-child(2)", {
      opacity: 1,
      scale: 1.05,
      y: -50,
      duration: 1
    }, 0.3)
    // First image exits
    .to(".image-section:nth-child(1)", {
      opacity: 0,
      scale: 0.95,
      y: 50,
      duration: 1
    }, 0.8)
    // Third image enters
    .to(".image-section:nth-child(3)", {
      opacity: 1,
      scale: 1.08,
      y: -30,
      duration: 1.2
    }, 1.2)
    // Second image exits
    .to(".image-section:nth-child(2)", {
      opacity: 0,
      scale: 0.97,
      y: 40,
      duration: 1
    }, 1.5);

    // Floating effect for images
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
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 flex items-center px-6 sm:px-12 lg:px-24 py-16"
    >
      {/* Content Container */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(20,120,200,0.1)_0%,transparent_70%)]"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Text Content */}
      <div className="w-full lg:w-1/2 z-10 relative">
        <div ref={textRef} className="max-w-2xl">
          <div className="inline-block px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
            <span className="text-sm font-semibold text-cyan-300">New Courses Available</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">Unlock Your</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Potential
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed">
            Join <span className="font-semibold text-white">50,000+ professionals</span> transforming their careers with our expert-led courses.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link
              to="/courses"
              className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 group overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Explore Courses
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            
            <Link
              to="/signup"
              className="px-8 py-4 border-2 border-white/20 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Start Free Trial
            </Link>
          </div>
          
          <div className="mt-8 flex items-center space-x-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((item) => (
                <img 
                  key={item}
                  src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item+20}.jpg`}
                  alt="Student"
                  className="w-10 h-10 rounded-full border-2 border-white/20"
                />
              ))}
            </div>
            <div className="text-sm text-gray-400">
              <span className="font-medium text-white">4.9/5</span> from 2,500+ reviews
            </div>
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
          <span className="text-xs text-gray-400 mb-1">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full animate-scroll-indicator"></div>
          </div>
        </div>
      </div>
    </section>
  );
}