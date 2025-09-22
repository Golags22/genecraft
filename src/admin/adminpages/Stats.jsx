import { useState, useEffect } from "react";

export default function Stats() {
  const [statsData, setStatsData] = useState([
    { title: "Total Courses", value: 0, icon: "📚", color: "from-blue-500 to-cyan-500", change: "+12%", description: "Active courses" },
    { title: "Total Students", value: 0, icon: "👥", color: "from-green-500 to-emerald-500", change: "+24%", description: "Enrolled learners" },
    { title: "Resources", value: 0, icon: "📁", color: "from-purple-500 to-pink-500", change: "+8%", description: "Learning materials" },
    { title: "Completion Rate", value: 0, icon: "📊", color: "from-orange-500 to-red-500", change: "+5%", description: "Course completion", isPercentage: true }
  ]);

  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading with animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatsData([
        { title: "Total Courses", value: 12, icon: "📚", color: "from-blue-500 to-cyan-500", change: "+12%", description: "Active courses" },
        { title: "Total Students", value: 120, icon: "👥", color: "from-green-500 to-emerald-500", change: "+24%", description: "Enrolled learners" },
        { title: "Resources", value: 34, icon: "📁", color: "from-purple-500 to-pink-500", change: "+8%", description: "Learning materials" },
        { title: "Completion Rate", value: 78, icon: "📊", color: "from-orange-500 to-red-500", change: "+5%", description: "Course completion", isPercentage: true }
      ]);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Animate counting up
  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        setStatsData(prev => prev.map(stat => ({
          ...stat,
          value: stat.value < stat.originalValue ? stat.value + 1 : stat.value
        })));
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((_, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-xl shadow-sm animate-pulse"
          >
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <div 
          key={index}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Background gradient effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
          
          {/* Icon */}
          <div className="flex items-center justify-between mb-4">
            <div className={`text-3xl p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white shadow-sm`}>
              {stat.icon}
            </div>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
              stat.change.includes('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {stat.change}
            </span>
          </div>
          
          {/* Content */}
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-800 mb-2">
              {stat.isPercentage ? `${stat.value}%` : stat.value.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">{stat.description}</p>
          </div>
          
          {/* Progress bar for completion rate */}
          {stat.isPercentage && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${stat.value}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}