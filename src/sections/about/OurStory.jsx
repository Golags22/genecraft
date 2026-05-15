export default function OurStory() {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-[#74377a]/5 via-white to-[#74377a]/5">
      <div className="max-w-6xl mx-auto">
        {/* Section header with decorative elements */}
        <div className="text-center mb-16">
         
          
  
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 relative inline-block">
            <span className="relative z-10">
              Our Journey
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#74377a] rounded-full"></span>
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
         Established in February 2025, Gene Craft has successfully delivered 3 cohorts trainings.
          </p>
        </div>

        {/* Timeline layout */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 h-full w-0.5 bg-gradient-to-b from-[#74377a]/20 via-[#74377a] to-[#74377a]/20 transform -translate-x-1/2 hidden md:block"></div>

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-16">
            {[
              {
                title: "Cohort 1.0 Onboarding Session",
                icon: (
                  <svg className="w-8 h-8 text-[#74377a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                ),
                url: "https://res.cloudinary.com/ddquednvr/image/upload/v1761499077/IMG-20250507-WA0014_ecxx0c.jpg"
              },
              {
                title: "Training Session on Introduction to AMR",
                icon: (
                  <svg className="w-8 h-8 text-[#74377a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                ), 
                url: "https://res.cloudinary.com/ddquednvr/image/upload/v1761504519/WhatsApp_Image_2025-10-26_at_19.43.27_f78984a2_pn6f1s.jpg"
              },
              {
                title: "Bioinformatics Training Session",
                icon: (
                  <svg className="w-8 h-8 text-[#74377a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                ),
                url: "https://res.cloudinary.com/ddquednvr/image/upload/v1761504519/WhatsApp_Image_2025-10-26_at_19.44.50_1ebe6a14_rdym3a.jpg"
              },
              {
                title: "Molecular Docking Training Session",
                icon: (
                  <svg className="w-8 h-8 text-[#74377a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                ),
                url: "https://res.cloudinary.com/ddquednvr/image/upload/v1761504519/WhatsApp_Image_2025-10-26_at_19.45.26_6f686eed_xxhfco.jpg"
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="hidden md:block absolute top-6 left-1/2 w-4 h-4 bg-[#74377a] rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg shadow-[#74377a]/40"></div>

                {/* Content container */}
                <div className={`bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 max-w-lg mx-auto ${index % 2 === 0 ? "md:mr-auto md:ml-0 md:pr-16" : "md:ml-auto md:mr-0 md:pl-16"}`}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#74377a]/10 rounded-full flex items-center justify-center mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                    </div>
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img src={item.url} alt="story-img" className="w-full h-50 object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}