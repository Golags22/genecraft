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
    </section>
  );
};

