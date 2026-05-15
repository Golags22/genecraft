import { useState } from 'react';
import { director, Collaborators } from '../../Data/data';

function DirectorCard({ director }) {
  const [expanded, setExpanded] = useState(false);
  const bioWords = director.bio.split(' ');
  const shortBio = bioWords.slice(0, 18).join(' ');
  const needsReadMore = bioWords.length > 18;

  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-[#74377a]/10 transition-all duration-300 hover:-translate-y-2 group flex flex-col">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={director.image} 
          alt={director.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#74377a]/90 via-[#74377a]/40 to-transparent flex items-end p-6">
          <div>
            <h3 className="text-xl font-bold text-white">{director.name}</h3>
            <p className="text-purple-200 text-sm">{director.title}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        {/* INDEPENDENT: Only this card's expanded state matters here */}
        <p className="text-gray-700 leading-relaxed text-sm flex-1">
          {expanded || !needsReadMore ? director.bio : `${shortBio}...`}
        </p>
        {needsReadMore && (
          <button
            onClick={() => setExpanded(!expanded)} // ← ONLY changes THIS card
            className="mt-3 text-[#74377a] font-semibold text-sm hover:text-[#5d2b61] transition-colors duration-200 flex items-center gap-1 self-start cursor-pointer"
          >
            {expanded ? 'Show Less' : 'Read More'}
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
        {/* Debug: uncomment to see each card's independent state */}
        {/* <span className="text-xs text-gray-400 mt-2">State: {expanded ? 'OPEN' : 'CLOSED'}</span> */}
      </div>
    </div>
  );
}

export default function BoardOfDirectors() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="inline-block w-10 h-1 bg-[#74377a] rounded-sm mb-4"></span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Meet our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our distinguished leaders guiding the organization's vision and strategy
          </p>
        </div>

        {/* Each DirectorCard gets its OWN independent state */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {director.map((dir, index) => (
            <DirectorCard key={index} director={dir} />
          ))}
        </div>

        <div className="mt-20">
          <div className="text-center mb-10">
            <span className="inline-block w-10 h-1 bg-[#74377a] rounded-sm mb-4"></span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Collaborators</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {Collaborators.map((collaborator, index) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const description = collaborator.description || "No description available.";
    const shouldTruncate = description.length > 100;
    const truncatedText = description.slice(0, 100) + "...";

    return (
      <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-[#74377a]/10 transition-all duration-300 hover:-translate-y-2 group flex flex-col h-full">
        <div className="relative h-64 overflow-hidden">
          <img src={collaborator.image} alt={collaborator.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#74377a]/90 via-[#74377a]/40 to-transparent flex items-end p-6">
            <div>
              <h3 className="text-xl font-bold text-white">{collaborator.name}</h3>
              <p className="text-purple-200 text-sm">{collaborator.title}</p>
            </div>
          </div>
        </div>
        
        {/* Description section with Read More */}
        <div className="p-5 flex-grow">
          <p className="text-gray-700 text-sm leading-relaxed">
            {isExpanded ? description : truncatedText}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 text-[#74377a] hover:text-[#5a2b5e] text-sm font-semibold transition-colors duration-200 focus:outline-none"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
      </div>
    );
  })}
</div>
        </div>

      </div>
    </section>
  );
}