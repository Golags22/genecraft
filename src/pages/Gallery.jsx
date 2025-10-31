import { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiGrid, FiList, FiZoomIn, FiPlay, FiDownload, FiShare2 } from "react-icons/fi";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample gallery data
  const galleryItems = [
    {
      id: 1,
      type: 'image',
      category: 'events',
      title: 'Genomics Workshop 2024',
      description: 'Students participating in hands-on genomics training',
      image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1761499077/IMG-20250507-WA0014_ecxx0c.jpg',
   
    },
    {
      id: 2,
      type: 'image',
      category: 'labwork',
      title: 'DNA Sequencing Lab',
      description: 'Advanced sequencing equipment in our laboratory',
      image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1761499051/IMG-20250507-WA0012_lsfa36.jpg',
     
    },
    {
      id: 3,
      type: 'image',
      category: 'students',
      title: 'Graduation Ceremony',
      description: 'Celebrating our successful graduates',
      image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1761498856/IMG-20250506-WA0012_au7uhd.jpg',
   
    },
    {
      id: 4,
      type: 'video',
      category: 'events',
      title: 'Microbial Research Symposium',
      description: 'Annual research presentation event',
      image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1761498852/IMG-20250506-WA0012_aamup3.jpg',
     
    },
    {
      id: 5,
      type: 'image',
      category: 'labwork',
      title: 'CRISPR Technology Demo',
      description: 'Demonstrating gene editing techniques',
      image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1761498981/IMG-20250507-WA0004_rkrs9e.jpg',
   
    },
  ];

  const categories = [
    { id: 'all', name: 'All Media', count: galleryItems.length },
    { id: 'events', name: 'Events', count: galleryItems.filter(item => item.category === 'events').length },
    { id: 'labwork', name: 'Lab Work', count: galleryItems.filter(item => item.category === 'labwork').length },
    { id: 'students', name: 'Students', count: galleryItems.filter(item => item.category === 'students').length },
    { id: 'facilities', name: 'Facilities', count: galleryItems.filter(item => item.category === 'facilities').length }
  ];

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#74377a] to-[#f9b7dd] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Gallery</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Explore the vibrant life at Gene-Craft through our collection of events, lab work, and student achievements
          </p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="container mx-auto px-6 py-8">
    
        {/* Gallery Grid */}
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-6"
        }>
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Image/Video Container */}
              <div className={`relative overflow-hidden ${
                viewMode === 'list' ? 'w-64 flex-shrink-0' : 'h-64'
              }`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedImage(item)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
                    >
                      <FiZoomIn className="w-4 h-4" />
                    </button>
                    {item.type === 'video' && (
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors">
                        <FiPlay className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors">
                      <FiDownload className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors">
                      <FiShare2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.type === 'video' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-[#74377a] text-white'
                  }`}>
                    {item.type === 'video' ? 'Video' : 'Image'}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

       
      </div>

     
    </div>
  );
}