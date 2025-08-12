export default function OurStory() {
  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Section header with decorative elements */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white relative inline-block">
            <span className="relative z-10">
              Our Journey
              <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-100 dark:bg-blue-900/50 transform -translate-y-1"></span>
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From humble beginnings to becoming a global learning platform
          </p>
        </div>

        {/* Timeline layout */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 h-full w-0.5 bg-blue-200 dark:bg-blue-900/30 transform -translate-x-1/2 hidden md:block"></div>

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-16">
            {[
              {
                year: "2025",
                title: "The Beginning",
                content: "Founded with a simple idea: learning should be flexible, engaging, and available to all. Started as a small project in a home office.",
                icon: (
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                )
              },
              {
                year: "2026",
                title: "First Milestone",
                content: "Reached 10,000 active learners. Launched our first mobile app to make learning accessible anywhere.",
                icon: (
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                )
              },
              {
                year: "2027",
                title: "Global Expansion",
                content: "Expanded to serve learners in 50+ countries. Partnered with top universities and industry leaders.",
                icon: (
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                )
              },
              {
                year: "Present",
                title: "Today",
                content: "Serving millions of learners worldwide with thousands of courses across all disciplines.",
                icon: (
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                )
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="hidden md:block absolute top-6 left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>

                {/* Content container */}
                <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 max-w-lg mx-auto ${index % 2 === 0 ? "md:mr-auto md:ml-0 md:pr-16" : "md:ml-auto md:mr-0 md:pl-16"}`}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{item.year}</span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "2M+", label: "Learners" },
            { number: "10K+", label: "Courses" },
            { number: "50+", label: "Countries" },
            { number: "98%", label: "Satisfaction" }
          ].map((stat, index) => (
            <div key={index} className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.number}</div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}