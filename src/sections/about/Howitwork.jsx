import React from 'react';

export default function Howitwork (){
  const steps = [
    {
      number: "01",
      title: "Register",
      description: "Register for any of our available in-person trainings on the website platform or any subsequent advertised course program"
    },
    {
      number: "02",
      title: "Get Selected",
      description: "Get selected and attend onboarding sessions"
    },
    {
      number: "03",
      title: "Attend Trainings",
      description: "Attend our course trainings hosted bi-weekly pending on schedules"
    },
    {
      number: "04",
      title: "Complete Project",
      description: "Have the opportunity to complete class group project with peers"
    },
    {
      number: "05",
      title: "Certificate of Completion",
      description: "Get Certificate of Completion and join our Alumni network for further benefits"
    }
  ];

  return (
    <section 
    id='howitwork'
    className="max-w-5xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-block w-10 h-1 bg-[#74377a] rounded-sm mb-4"></span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
          How It Works
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Your journey to mastering genomic data analysis in five simple steps
        </p>
      </div>

      {/* Steps */}
      <div className="relative">
        {/* Vertical connecting line (desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-purple-100 -translate-x-1/2"></div>

        <div className="space-y-12 md:space-y-0">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-10 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`flex-1 text-center md:text-left ${
                index % 2 === 0 ? 'md:text-right' : 'md:text-left'
              }`}>
                <span className="inline-block text-sm font-semibold text-[#74377a] bg-purple-50 px-3 py-1 rounded-lg mb-3">
                  Step {step.number}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0">
                  {step.description}
                </p>
              </div>

              {/* Center dot */}
              <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-[#74377a] text-white rounded-full flex items-center justify-center font-bold shadow-lg shadow-[#74377a]/20">
                {step.number}
              </div>

              {/* Spacer for alternating layout */}
              <div className="flex-1 hidden md:block"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <a
          href="/users/signup"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#74377a] text-white rounded-xl font-semibold hover:bg-[#5d2b61] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#74377a]/20"
        >
          Get Started Now
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
     <section className="py-16 px-4 md:px-8 bg-gray-50">
  <div className="max-w-6xl mx-auto">
    {/* Section Header */}
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-[#74377a] mb-3">
        Other Services Rendered
      </h2>
      <div className="w-20 h-1 bg-[#74377a] mx-auto rounded-full"></div>
      <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
        Expert solutions tailored to your academic and research needs
      </p>
    </div>

    {/* Services Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Service 1 - Hybrid In-Person Training */}
      <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-[#74377a] group">
        <div className="flex items-start gap-4">
          <div className="bg-[#74377a]/10 rounded-xl p-3 group-hover:bg-[#74377a] transition-colors duration-300">
            <svg className="w-8 h-8 text-[#74377a] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4-4 4M7 8l-4 4 4 4" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Hybrid In-Person Training</h3>
            <p className="text-gray-600 leading-relaxed">
              We bring hands-on, practical training directly to academics, researchers, and lab teams. Flexible schedules, projects, and expert instructors  so your team can apply skills as they learn
            </p>
          </div>
        </div>
      </div>

      {/* Service 2 - Genomics Data Analysis */}
      <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-[#74377a] group">
        <div className="flex items-start gap-4">
          <div className="bg-[#74377a]/10 rounded-xl p-3 group-hover:bg-[#74377a] transition-colors duration-300">
            <svg className="w-8 h-8 text-[#74377a] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Genomics Data Analysis & Bioinformatics Support
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Stuck on complex sequencing data? We handle end-to-end analysis and build custom 
              bioinformatics workflows for researchers and postgraduate students in biological sciences. 
              Get clean results, and less stress.
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>
    </section>
  );
};

