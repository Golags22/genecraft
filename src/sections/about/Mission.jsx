export default function Mission() {
  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section header with decorative elements */}
        <div className="relative mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            <span className="relative inline-block">
              Our Mission
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transform -translate-y-2"></span>
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Driving innovation in online education to empower global learners
          </p>
        </div>

        {/* Mission statement with visual emphasis */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative">
            <svg 
              className="w-12 h-12 text-blue-500 absolute -top-10 -left-10 opacity-20 dark:opacity-30 hidden md:block" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v15a1 1 0 001 1h15M4 4l5 5m-5-5l5-5m10 10l-5 5m5-5l-5-5m-5 5l5 5m-5-5l5-5"/>
            </svg>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed md:leading-loose">
              <span className="text-blue-600 dark:text-blue-400 font-semibold">At Gene-Craft </span>, we believe education should be <span className="font-medium">accessible to everyone, anywhere</span>. Our mission is to provide <span className="font-medium">world-class online education</span> that bridges the gap between traditional classrooms and modern learning needs through innovative technology and expert-led instruction.
            </p>
            <svg 
              className="w-12 h-12 text-blue-500 absolute -bottom-10 -right-10 opacity-20 dark:opacity-30 hidden md:block" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 20V5a1 1 0 00-1-1H4m16 16l-5-5m5 5l-5 5M4 4l5 5m-5-5l5-5m10 10l-5 5m5-5l-5-5m-5 5l5 5m-5-5l5-5"/>
            </svg>
          </div>
        </div>

        {/* Supporting pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: (
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              ),
              title: "Quality Content",
              description: "Rigorously curated courses from industry experts"
            },
            {
              icon: (
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
                </svg>
              ),
              title: "Accessibility",
              description: "Affordable pricing and scholarships available"
            },
            {
              icon: (
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              ),
              title: "Innovation",
              description: "Cutting-edge learning technologies and methods"
            }
          ].map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}