import { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiGrid, FiList, FiZoomIn, FiPlay, FiDownload, FiShare2, FiX } from "react-icons/fi";

export default function Gallery() {
  const [activeCohort, setActiveCohort] = useState('cohort1');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Cohort data with images mapped to each cohort
  const cohortData = {
    cohort1: {
      title: "1st Cohort: Microbial Genomics Data Analysis Training",
      description: "Hands-on session covering genome assembly, annotation, variant calling, and phylogenetic analysis. Trainees worked with real sequencing data to build end-to-end bioinformatics workflows using specific tools and Database.",
      date: "May - July 2025",
      students: "100+",
      images: [
        {
          id: 1,
          type: 'image',
          title: 'Onboarding Session',
          description: 'Opening ceremony and introduction to the program',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1777546311/Screenshot_20260430_115001_WhatsApp_xvyolr.jpg',
        },
        {
          id: 2,
          type: 'image',
          title: 'Genomics Workshop',
          description: 'Students participating in hands-on genomics training',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1761498856/IMG-20250506-WA0012_au7uhd.jpg',
        },
        {
          id: 3,
          type: 'image',
          title: 'Graduation Ceremony',
          description: 'Celebrating our successful graduates',
          image: ' https://res.cloudinary.com/ddquednvr/image/upload/v1778779433/Screenshot_20260514_181430_LinkedIn_qtcgci.jpg',
        },
        {
          id: 4,
          type: 'video',
          title: 'Research Symposium',
          description: 'Annual research presentation event',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1778779433/Screenshot_20260514_181410_LinkedIn_iedefl.jpg',
        },
        {
          id: 5,
          type: 'image',
          title: 'CRISPR Demo',
          description: 'Demonstrating gene editing techniques',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1778779433/Screenshot_20260514_181419_LinkedIn_tndz0o.jpg',
        },
        {
          id: 6,
          type: 'image',
          title: 'CRISPR Demo',
          description: 'Demonstrating gene editing techniques',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1762016709/Screenshot_2025-07-01-18-02-38-36_2ef548bf47261a0f379d52645eb41568_te4x28.jpg',
        },
        {
          id: 7,
          type: 'image',
          title: 'CRISPR Demo',
          description: 'Demonstrating gene editing techniques',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1762016709/Screenshot_2025-07-01-18-46-19-83_2ef548bf47261a0f379d52645eb41568_nll3tz.jpg',
        },
        {
          id: 8,
          type: 'image',
          title: 'CRISPR Demo',
          description: 'Demonstrating gene editing techniques',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1762016709/Screenshot_2025-07-15-17-12-54-42_2ef548bf47261a0f379d52645eb41568_oulc2f.jpg',
        },
        {
          id: 9,
          type: 'image',
          title: 'CRISPR Demo',
          description: 'Demonstrating gene editing techniques',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1778799007/WhatsApp_Image_2026-05-15_at_12.46.52_AM_mzcwbr.jpg',
        },
        {
          id:11,
          type: 'image',
          title: 'CRISPR Demo',
          description: 'Demonstrating gene editing techniques',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1778799007/WhatsApp_Image_2026-05-15_at_12.46.52_AM_1_crkddc.jpg',
        },
        {
          id: 12,
          type: 'image',
          title: 'CRISPR Demo',
          description: 'Demonstrating gene editing techniques',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1778799007/WhatsApp_Image_2026-05-15_at_12.46.52_AM_2_fekj5d.jpg',
        },
        {
          id: 13,
          type: 'image',
          title: 'CRISPR Demo',
          description: 'Demonstrating gene editing techniques',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1778799006/WhatsApp_Image_2026-05-15_at_12.46.53_AM_itlyrr.jpg',
        }
      ]
    },
    cohort2: {
      title: "2nd Cohort: Molecular Docking training. ",
      description: "Computer-Aided Drug Design Training: Hands-on training in structure-based and ligand-based drug design. Trainees learned protein preparation, molecular docking, virtual screening, and ADMET prediction using respective tools on real protein targets.",
      images: [
        {
          id: 14,
          type: 'image',
          title: 'Bioinformatics Lab',
          description: 'Hands-on bioinformatics training session',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1777546310/Screenshot_20260430_114939_WhatsApp_wmgyjd.jpg',
        },
        {
          id: 15,
          type: 'image',
          title: 'Data Analysis Workshop',
          description: 'Learning computational biology techniques',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1767386558/IMG-20260102-WA0090_hirt34.jpg',
        },
        {
          id: 16,
          type: 'image',
          title: 'Group Project Presentation',
          description: 'Teams presenting their research findings',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1767386549/IMG-20260102-WA0086_rnapqh.jpg',
        },
        {
          id: 17,
          type: 'image',
          title: 'Pipeline Development',
          description: 'Building custom bioinformatics workflows',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1767386550/IMG-20260102-WA0088_oldq7g.jpg',
        },
        {
          id: 18,
          type: 'image',
          title: 'Pipeline Development',
          description: 'Building custom bioinformatics workflows',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1767386548/IMG-20260102-WA0087_cyazwr.jpg',
        },
        {
          id: 19,
          type: 'image',
          title: 'Pipeline Development',
          description: 'Building custom bioinformatics workflows',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1767386523/IMG-20260102-WA0067_wtsn4b.jpg',
        },
        {
          id: 20,
          type: 'image',
          title: 'Pipeline Development',
          description: 'Building custom bioinformatics workflows',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1767386523/IMG-20260102-WA0077_qtcx0k.jpg',
        },
        {
          id: 21,
          type: 'image',
          title: 'Pipeline Development',
          description: 'Building custom bioinformatics workflows',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1767386574/IMG-20260102-WA0091_utyspo.jpg',
        },
        {
          id: 22,
          type: 'image',
          title: 'Pipeline Development',
          description: 'Building custom bioinformatics workflows',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1767386558/IMG-20260102-WA0089_wkm7vj.jpg',
        },
        {
          id: 23,
          type: 'image',
          title: 'Pipeline Development',
          description: 'Building custom bioinformatics workflows',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1767386574/IMG-20260102-WA0091_utyspo.jpg',
        },
        {
          id: 24,
          type: 'image',
          title: 'Pipeline Development',
          description: 'Building custom bioinformatics workflows',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1778800554/WhatsApp_Image_2026-05-15_at_1.14.43_AM_uagndi.jpg',
        },
        {
          id: 25,
          type: 'image',
          title: 'Pipeline Development',
          description: 'Building custom bioinformatics workflows',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1778800554/WhatsApp_Image_2026-05-15_at_1.14.43_AM_1_mvmb9m.jpg',
        },
        {
          id: 26,
          type: 'image',
          title: 'Pipeline Development',
          description: 'Building custom bioinformatics workflows',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1778800554/WhatsApp_Image_2026-05-15_at_1.14.44_AM_tpuzfb.jpg',
        }
      ]
    },
    cohort3: {
      title: "3rd Cohort: Geospatial Training for Public Health with ArcGIS. ",
      description: "Hands-on training in GIS workflows using ArcGIS. Trainees learned to map disease distribution, analyze health facility access, conduct spatial epidemiology, and visualize public health data for evidence-based decision making.",
      date: "November 2025 - January 2026",
      students: "60+",
      images: [
        {
          id: 27,
          type: 'image',
          title: 'Molecular Docking Session',
          description: 'Hands-on molecular docking training',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1777545637/IMG-20251104-WA0029_1_mnd1pv.jpg',
        },
        {
          id: 28,
          type: 'image',
          title: 'Protein-Ligand Interaction',
          description: 'Analyzing protein-ligand binding sites',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1767386541/IMG-20260102-WA0079_ywcada.jpg',
        },
        {
          id: 29,
          type: 'image',
          title: 'Drug Discovery Workshop',
          description: 'Virtual screening techniques',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1767386547/IMG-20260102-WA0084_l8mqta.jpg',
        },
        {
          id: 30,
          type: 'image',
          title: 'Advanced Docking Techniques',
          description: 'Mastering molecular docking software',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1767386530/IMG-20260102-WA0081_mzpnmn.jpg',
        },
        {
          id: 31,
          type: 'image',
          title: 'Advanced Docking Techniques',
          description: 'Mastering molecular docking software',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1767386500/IMG-20260102-WA0062_deh0fx.jpg',
        },
        
        {
          id: 32,
          type: 'image',
          title: 'Advanced Docking Techniques',
          description: 'Mastering molecular docking software',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1767386482/IMG-20260102-WA0056_mmzaah.jpg',
        },
        
        
        {
          id: 33,
          type: 'image',
          title: 'Advanced Docking Techniques',
          description: 'Mastering molecular docking software',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1767386531/IMG-20260102-WA0080_eyistc.jpg',
        },
        
      ]
    },
    traineesSpotlight: {

          title: 'Trainees Spotlight',
description: "Shining a light on the students who showed up, worked hard, and completed our training programs. From analyzing genomes to mapping health data in ArcGIS.",
     
      images: [
        {
          type: 'image',
          title: 'Pipeline Development',
          description: 'Building custom bioinformatics workflows',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1778770396/IMG-20260514-WA0027_pio0gv.jpg',
        },]
    },
    certificate: {

          title: 'Samples of some certificates',
description: "",
     
      images: [
        {
          type: 'image',
          title: 'Pipeline Development',
          description: 'Building custom bioinformatics workflows',
          image: 'https://res.cloudinary.com/ddquednvr/image/upload/v1777536997/Screenshot_20260430_090604_Gallery_cvw8lu.jpg',
        },]
    }
    
  };

  const cohorts = [
    { id: 'cohort1', name: '1st Cohort', icon: '🎓' },
    { id: 'cohort2', name: '2nd Cohort', icon: '🔬' },
    { id: 'cohort3', name: '3rd Cohort', icon: '🧬' },
    { id: 'traineesSpotlight', name: 'Trainees Spotlight', icon: '📈' },
    { id: 'certificate', name: 'Certificates', icon: '🎗️' }
  ];

  const currentCohort = cohortData[activeCohort];
  const filteredImages = currentCohort.images.filter(image =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Modal for image preview
  const ImageModal = () => {
    if (!selectedImage) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
        <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute -top-12 right-0 text-white hover:text-[#74377a] transition-colors"
          >
            <FiX className="w-8 h-8" />
          </button>
          <img src={selectedImage.image} alt={selectedImage.title} className="w-full rounded-lg" />
          <div className="bg-white p-4 rounded-b-lg mt-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedImage.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{selectedImage.description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      {/* Hero Section */}
      <div className="bg-[#74377a] text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-lg text-purple-200 max-w-2xl mx-auto">
            Capturing moments from our training programs and events
          </p>
        </div>
      </div>

      {/* Cohort Selector */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {cohorts.map(cohort => (
            <button
              key={cohort.id}
              onClick={() => setActiveCohort(cohort.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCohort === cohort.id
                  ? 'bg-[#74377a] text-white shadow-lg shadow-[#74377a]/30'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#74377a]/10'
              }`}
            >
              <span className="text-xl">{cohort.icon}</span>
              <span>{cohort.name}</span>
            </button>
          ))}
        </div>

        {/* Cohort Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {currentCohort.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {currentCohort.description}
              </p>
            </div>
          
          </div>
        </div>

      

        {/* View Mode Toggle */}
      

        {/* Gallery Grid */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No images found</p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }>
            {filteredImages.map(item => (
              <div
                key={item.id}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                  viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                }`}
              >
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'sm:w-64 h-48 sm:h-auto' : 'h-64'
                }`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
                    onClick={() => setSelectedImage(item)}
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
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors">
                        <FiDownload className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors">
                        <FiShare2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                
                </div>

                
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal />
    </div>
  );
}