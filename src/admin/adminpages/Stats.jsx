import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../database/firebase";
import { FcPodiumWithSpeaker } from "react-icons/fc";


// Think of this like: We're going to count all our toys (courses, students, etc.) from the toy box (Firebase)

export default function Stats() {
  const [statsData, setStatsData] = useState([
    { title: "Total Courses", value: 0, icon: "📚", color: "from-blue-500 to-cyan-500", change: "+0%", description: "Active courses" },
    { title: "Total Students", value: 0, icon: "👥", color: "from-green-500 to-emerald-500", change: "+0%", description: "Enrolled learners" },
    { title: "Resources", value: 0, icon: "📁", color: "from-purple-500 to-pink-500", change: "+0%", description: "Learning materials" },
    { title: "Completion Rate", value: 0, icon: "📊", color: "from-orange-500 to-red-500", change: "+0%", description: "Course completion", isPercentage: true }
  ]);

  const [isLoading, setIsLoading] = useState(true);

  // 🎯 STEP 1: Get all the real data from our magic cloud (Firebase)
  // This is like asking a friend to count all your toys for you
  useEffect(() => {
    const fetchRealData = async () => {
      setIsLoading(true); // Show "I'm counting!" message
      
      try {
        // 📚 STEP 2: Count all the courses (like counting different types of toys)
        const coursesSnapshot = await getDocs(collection(db, "courses"));
        const totalCourses = coursesSnapshot.size; // How many courses do we have?

        // 👥 STEP 3: Count all the students (like counting all your friends who play with toys)
        // First, let's find where we keep student information
        // If students are in a separate collection:
        const studentsSnapshot = await getDocs(collection(db, "users"));
        // Only count people who are students (not teachers)
        const totalStudents = studentsSnapshot.docs.filter(doc => 
          doc.data().role === "student" || doc.data().userType === "student"
        ).length;
        // If students are marked differently, adjust the filter above accordingly

        // 👑 STEP 4: Count all admin power (like counting your superhero friends)
        const adminSnapshot = await getDocs(collection(db, "users"));
        const totalAdmins = adminSnapshot.docs.filter(doc => 
          doc.data().role === "admin" || doc.data().userType === "admin"
        ).length;

        // 📁 STEP 5: Count all resources (like counting instruction booklets for toys)
        // If resources are in their own collection:
        const resourcesSnapshot = await getDocs(collection(db, "resources"));
        const totalResources = resourcesSnapshot.size;
        
        // OR if resources are inside each course:
        // const allResources = coursesSnapshot.docs.reduce((total, courseDoc) => {
        //   return total + (courseDoc.data().resources?.length || 0);
        // }, 0);

        // 📊 STEP 5: Calculate completion rate (like how many toys are fully built)
        // We need to check how many students finished their courses
        let totalCompletion = 0;
        let totalPossibleCompletions = 0;
        
        // Let's look at each student's progress
        const enrollmentsSnapshot = await getDocs(collection(db, "enrollments"));
        
        enrollmentsSnapshot.forEach(doc => {
          const enrollment = doc.data();
          if (enrollment.progress >= 100) { // If they finished (100% done)
            totalCompletion++;
          }
          totalPossibleCompletions++;
        });

        // Calculate percentage (like: how many cookies did you eat out of the jar?)
        const completionRate = totalPossibleCompletions > 0 
          ? Math.round((totalCompletion / totalPossibleCompletions) * 100)
          : 0;

        // 🎉 STEP 6: Put all our counts into the display boxes
        setStatsData([
           { 
            title: "Amind Power", 
            value: totalAdmins, 
            icon: <FcPodiumWithSpeaker />, 
            description: "Current Admin", 
             color: "from-blue-500 to-cyen-500", 
          
          },
          { 
            title: "Total Courses", 
            value: totalCourses, 
            icon: "📚", 
            color: "from-blue-500 to-cyan-500", 
            change: "+12%", // You can make this real too by comparing with yesterday's count!
            description: "Active courses" 
          },
          { 
            title: "Total Students", 
            value: totalStudents, 
            icon: "👥", 
            color: "from-green-500 to-emerald-500", 
            change: "+24%", // Count how many new students joined today
            description: "Enrolled learners" 
          },
          { 
            title: "Resources", 
            value: totalResources, 
            icon: "📁", 
            color: "from-purple-500 to-pink-500", 
            change: "+8%", // Count new resources added
            description: "Learning materials" 
          },
          { 
            title: "Completion Rate", 
            value: completionRate, 
            icon: "📊", 
            color: "from-orange-500 to-red-500", 
            change: "+5%", // Compare with last week's completion
            description: "Course completion", 
            isPercentage: true 
          }
         
        ]);
      } catch (error) {
        console.error("Oops! Couldn't count our toys:", error);
        // If we can't count, we show zeros so nothing breaks
      } finally {
        setIsLoading(false); // Hide "I'm counting!" message
      }
    };

    fetchRealData();
  }, []); // Empty [] means: "Do this once when the page loads"

  // 🎪 STEP 7: Make the numbers go up like a countdown timer
  // This is just for fun - makes the numbers roll up like a scoreboard!
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

  // ⏳ STEP 8: Show "Loading..." while we're counting
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

  // 🎨 STEP 9: Show the final counted numbers in pretty boxes
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <div 
          key={index}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Pretty color background - like a colored light behind the box */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
          
          {/* Emoji and percentage change */}
          <div className="flex items-center justify-between mb-4">
            <div className={`text-3xl p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white shadow-sm`}>
              {stat.icon}
            </div>
            {/* <span className={`text-sm font-medium px-2 py-1 rounded-full ${
              stat.change.includes('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {stat.change}
            </span> */}
          </div>
          
          {/* The actual numbers we counted */}
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-800 mb-2">
              {stat.isPercentage ? `${stat.value}%` : stat.value.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">{stat.description}</p>
          </div>
          
          {/* Progress bar - only for completion rate (shows how full the glass is) */}
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