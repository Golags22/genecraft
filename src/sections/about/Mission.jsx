export default function Mission() {
  const coreValues = [
    {
      icon: (
        <svg className="w-8 h-8 text-[#74377a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
        </svg>
      ),
      title: "Excellence",
      description: "Commitment to the highest standards in education and research"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#74377a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
      ),
      title: "Collaboration",
      description: "Fostering partnerships across disciplines and institutions"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#74377a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
        </svg>
      ),
      title: "Accessibility",
      description: "Making cutting-edge knowledge available to all qualified students"
    }
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block w-10 h-1 bg-[#74377a] rounded-sm mb-4"></span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Our Purpose
          </h2>
          <div className="max-w-3xl mx-auto text-left space-y-4">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
              <h3 className="text-xl font-semibold text-[#74377a] mb-3">
                Purpose of our Trainings
              </h3>
              <p className="text-gray-600 leading-relaxed">
                At Gene Craft Microbial Genomics Academy, the purpose of the trainings is to provide a foundation to the field of bioinformatics with a focus on important bioinformatics tools and data bases in combination with insilico drug design platforms. Over a period of 3 months of intensive bi-weekly contact sessions, the course combines theoretical and practical approach to allow participants to gain practical experiences in using various tools and resources.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
              <h3 className="text-xl font-semibold text-[#74377a] mb-3">
                The course is intended for
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li className="leading-relaxed">Individuals from biology background who have basic understanding in genomics and would like to become a bioinformatics user</li>
                <li className="leading-relaxed">Individuals with no prior experiences in bioinformatics</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Mission and Vision Cards */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Mission Card */}
          <div className="flex-1 bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#74377a]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-[#74377a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              To bridge the gap between microbial genomics research and practice by providing:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <span className="w-5 h-5 bg-[#74377a] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
                <span className="text-gray-600">Hands-on training workshops in bioinformatic techniques</span>
              </li>
              <li className="flex items-start group">
                <span className="w-5 h-5 bg-[#74377a] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
                <span className="text-gray-600">Personalized mentorship with bioinformatians</span>
              </li>
              <li className="flex items-start group">
                <span className="w-5 h-5 bg-[#74377a] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
                <span className="text-gray-600">Valuable networking opportunities with peers and professionals</span>
              </li>
            </ul>
          </div>

          {/* Vision Card */}
          <div className="flex-1 bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#74377a]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-[#74377a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To grow from a virtual platform into a state-of-the-art physical laboratory to support hybrid trainings.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}