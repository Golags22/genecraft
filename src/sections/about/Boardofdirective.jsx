import { director,Collaborators } from '../../Data/data';

export default function BoardOfDirectors() {

  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            <span className="relative inline-block">
              Board of Directors
              <span className="absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transform -translate-y-2"></span>
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our distinguished leaders guiding the organization's vision and strategy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {director.map((director, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-67 overflow-hidden">
                <img 
                  src={director.image} 
                  alt={director.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">{director.name}</h3>
                    <p className="text-blue-300">{director.title}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">{director.bio}</p>
               
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-bold rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
           Collaborators          
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-10">
          {Collaborators.map((Collaborators, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-67 overflow-hidden">
                <img 
                  src={Collaborators.image} 
                  alt={Collaborators.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">{Collaborators.name}</h3>
                    <p className="text-blue-300">{Collaborators.title}</p>
                  </div>
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